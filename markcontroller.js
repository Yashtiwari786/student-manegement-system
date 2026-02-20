const Student = require('../models/student');
const Mark = require('../models/marks');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Assign marks to student for a subject
exports.assignMarks = async (req, res) => {
  try {
    const { studentId, subjectId, marks, totalMarks } = req.body;

    let mark = await Mark.findOne({ studentId, subjectId });

    if (mark) {
      mark.marks = marks;
      mark.totalMarks = totalMarks;
    } else {
      mark = new Mark({ studentId, subjectId, marks, totalMarks });
    }

    await mark.save();

    // Check if all subjects have marks
    const student = await Student.findById(studentId).populate('subjects');
    const markedSubjects = await Mark.countDocuments({
      studentId,
      subjectId: { $in: student.subjects }
    });

    if (markedSubjects === student.subjects.length) {
      await generateResultPDF(studentId);
    }

    res.status(200).json({ message: 'Marks assigned successfully', mark });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate PDF result when all marks are uploaded
const generateResultPDF = async (studentId) => {
  try {
    const student = await Student.findById(studentId).populate('subjects');
    const marks = await Mark.find({ studentId }).populate('subjectId');

    let totalMarks = 0;
    let obtainedMarks = 0;

    marks.forEach(mark => {
      totalMarks += mark.totalMarks;
      obtainedMarks += mark.marks;
    });

    const cgpa = ((obtainedMarks / totalMarks) * 4).toFixed(2);
    const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../results/${student._id}_result.pdf`);

    // Ensure results folder exists
    if (!fs.existsSync(path.join(__dirname, '../results'))) {
      fs.mkdirSync(path.join(__dirname, '../results'));
    }

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(16).text('Student Result Card', { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Name: ${student.name}`);
    doc.text(`Roll No: ${student.rollNo}`);
    doc.moveDown();

    doc.text('Subject Marks:');
    marks.forEach(mark => {
      doc.text(`${mark.subjectId.name}: ${mark.marks}/${mark.totalMarks}`);
    });

    doc.moveDown();
    doc.fontSize(12).text(`Total Marks: ${obtainedMarks}/${totalMarks}`);
    doc.text(`Percentage: ${percentage}%`);
    doc.text(`CGPA: ${cgpa}`);

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

// Get student result (JSON)
exports.getStudentResult = async (req, res) => {
  try {
    const { studentId } = req.params;
    const marks = await Mark.find({ studentId }).populate('subjectId');

    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Download student result PDF
exports.downloadResultPDF = async (req, res) => {
  try {
    const { studentId } = req.params;
    const filePath = path.join(__dirname, `../results/${studentId}_result.pdf`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Result PDF not found. Marks may not be fully uploaded yet.' });
    }

    res.download(filePath, `${studentId}_result.pdf`);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};