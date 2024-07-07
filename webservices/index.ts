import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

dotenv.config();

interface IMessage {
  id: string;
  name: string;
  message: string;
}

async function connectToDatabase(): Promise<void> {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_CONNECTION!);
    console.log("Database connected: ", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const corsOptions = {
  origin: 'https://qrcode.kiwi',
  optionsSuccessStatus: 200
};

connectToDatabase();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const messageSchema = new mongoose.Schema<IMessage>({
  id: { type: String, required: true, unique: true },
  name: String,
  message: String,
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

app.post('/api/messages', async (req: Request, res: Response) => {
  const { id, name, message } = req.body;
  try {
    const newMessage = new Message({ id, name, message });
    await newMessage.save();
    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/messages/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const message = await Message
      .findOne({ id })
      .select('name message -_id')
      .exec();
    if (message) {
      res.status(200).send(message);
    } else {
      res.status(404).send('Message not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});