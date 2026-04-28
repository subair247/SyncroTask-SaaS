const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware'); 

// 1. GET all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Changed to userId (lowercase u) to match your Task.js model
        const tasks = await Task.findAll({ 
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST a new task
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            userId: req.user.id, // Changed to userId (lowercase u)
            completed: false
        });
        res.status(201).json(newTask);
    } catch (err) {
        console.error("BACKEND ERROR:", err); 
        res.status(400).json({ message: err.message });
    }
});

// 3. PUT (Update) task status
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Changed to userId (lowercase u)
        const task = await Task.findOne({ 
            where: { id: req.params.id, userId: req.user.id } 
        });

        if (task) {
            task.completed = !task.completed;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. DELETE a task
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Changed to userId (lowercase u)
        const result = await Task.destroy({ 
            where: { id: req.params.id, userId: req.user.id } 
        });

        if (result) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;