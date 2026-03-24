import Task from "./task_model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }
        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            data: task
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { status, priority, date } = req.query;

        let filter = { user: req.user.id };

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (date) filter.dueDate = date;

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const toggleTaskStatus = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        task.status = task.status === "completed" ? "pending" : "completed";
        await task.save();

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const forwardTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (task.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Completed task cannot be forwarded"
            });
        }

        const nextDay = new Date(task.dueDate);
        nextDay.setDate(nextDay.getDate() + 1);

        task.dueDate = nextDay;
        await task.save();

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};