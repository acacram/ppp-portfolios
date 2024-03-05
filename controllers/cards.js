// Controllers for cards

// getItems for cards
const getItems = async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// getItem for cards
const getItem = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// createItem for cards
const createItem = async (req, res) => {
    try {
        const card = new Card(req.body);
        const newCard = await card.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// updateItem for cards
const updateItem = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        card.username = req.body.username;
        card.fullName = req.body.fullName;
        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// deleteItem for cards
const deleteItem = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        await card.remove();
        res.json({ message: 'Card deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        if (err) {
            console.error(err);
        }
    }
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem };