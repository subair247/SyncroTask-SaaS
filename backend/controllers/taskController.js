const Task = require('../models/Task');

// 1. Fetch tasks for the logged-in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ 
            where: { userId: req.user.id }, 
            order: [['createdAt', 'DESC']] 
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve tasks." });
    }
};

// 2. Create a new task
// Create a new task tied to the user
exports.createTask = async (req, res) => {
    try {
        const { title } = req.body;

        // 1. Validation
        if (!title) {
            return res.status(400).json({ error: "Title is required." });
        }

        // 2. Creation 
        // This relies on verifyToken attaching the user to req.user
        const newTask = await Task.create({
            title,
            userId: req.user.id, 
            completed: false
        });

        // 3. Success Response
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Task Creation Error:", error); 
        res.status(400).json({ error: "Task creation failed. Check backend console." });
    }
};

// 3. Update task (Toggle Complete)
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (task) {
            task.completed = !task.completed;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ error: "Task not found." });
        }
    } catch (error) {
        res.status(400).json({ error: "Update failed." });
    }
};

// 4. Delete task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Task.destroy({ where: { id, userId: req.user.id } });
        if (deleted) {
            res.json({ message: "Deleted" });
        } else {
            res.status(404).json({ error: "Not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};