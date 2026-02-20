class AnnouncementController {
  constructor() {
    this.announcements = [];
    this.messages = [];
  }

  // Teacher creates announcement (visible to all students)
  createAnnouncement = (req, res) => {
    try {
      const { teacherId, title, content, targetAudience = 'all' } = req.body;
      const announcement = {
        id: Date.now(),
        teacherId,
        title,
        content,
        targetAudience, // 'all', 'class1', etc.
        createdAt: new Date(),
        type: 'teacher'
      };
      this.announcements.push(announcement);
      res.status(201).json({ success: true, announcement });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Director creates announcement (higher priority)
  createDirectorAnnouncement = (req, res) => {
    try {
      const { directorId, title, content } = req.body;
      const announcement = {
        id: Date.now(),
        directorId,
        title,
        content,
        createdAt: new Date(),
        type: 'director',
        isPriority: true
      };
      this.announcements.push(announcement);
      res.status(201).json({ success: true, announcement });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Student reads announcements
  getAnnouncementsForStudent = (req, res) => {
    try {
      const { studentId, studentClass } = req.query;
      const filtered = this.announcements.filter(
        a =>
          a.type === 'director' ||
          a.targetAudience === 'all' ||
          a.targetAudience === studentClass
      );
      res.json({ success: true, announcements: filtered });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Director sends message to specific teacher
  sendMessageToTeacher = (req, res) => {
    try {
      const { directorId, teacherId, subject, message } = req.body;
      const msg = {
        id: Date.now(),
        fromDirector: directorId,
        toTeacher: teacherId,
        subject,
        message,
        sentAt: new Date(),
        read: false
      };
      this.messages.push(msg);
      res.status(201).json({ success: true, message: msg });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Teacher retrieves messages from director
  getMessagesFromDirector = (req, res) => {
    try {
      const { teacherId } = req.params;
      const msgs = this.messages.filter(m => m.toTeacher === teacherId);
      res.json({ success: true, messages: msgs });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Get all announcements
  getAllAnnouncements = (req, res) => {
    try {
      res.json({ success: true, announcements: this.announcements });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}

module.exports = new AnnouncementController();