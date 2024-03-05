// Controller for users

// getItems for users
const getItems = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// getItem for users
const getItem = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// createItem for users
const createItem = async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// updateItem for users
const updateItem = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.username = req.body.username;
        user.fullName = req.body.fullName;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// deleteItem for users
const deleteItem = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };