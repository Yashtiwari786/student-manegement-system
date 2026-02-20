const Fees = require('../models/fees');
const Student = require('../models/student');

// Fees Controller

// Get all fees structures
exports.getAllFees = async (req, res) => {
    try {
        const fees = await Fees.find().populate('studentId');
        res.status(200).json({
            success: true,
            data: fees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get fees by student ID
exports.getFeesbyStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const fees = await Fees.findOne({ studentId }).populate('studentId');
        
        if (!fees) {
            return res.status(404).json({
                success: false,
                message: 'Fees record not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: fees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create fees structure
exports.createFees = async (req, res) => {
    try {
        const fees = await Fees.create(req.body);
        res.status(201).json({
            success: true,
            data: fees
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update fees
exports.updateFees = async (req, res) => {
    try {
        const fees = await Fees.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            data: fees
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete fees
exports.deleteFees = async (req, res) => {
    try {
        await Fees.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Fees deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};