"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
async function connectToDatabase() {
    try {
        const connect = await mongoose_1.default.connect(process.env.DATABASE_CONNECTION);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
connectToDatabase();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const messageSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    message: String,
});
const Message = mongoose_1.default.model('Message', messageSchema);
app.post('/api/messages', async (req, res) => {
    const { id, name, message } = req.body;
    try {
        const newMessage = new Message({ id, name, message });
        await newMessage.save();
        res.status(201).send(newMessage);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.get('/api/messages/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const message = await Message
            .findOne({ id })
            .select('name message -_id')
            .exec();
        if (message) {
            res.status(200).send(message);
        }
        else {
            res.status(404).send('Message not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
//# sourceMappingURL=index.js.map