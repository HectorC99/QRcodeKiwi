require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

async function connectToDatabase() {
  try {
    const connect = await (await mongoose.connect(process.env.DATABASE_CONNECTION))
    console.log("Database connected: ", connect.connection.host, connect.connection.name)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

connectToDatabase()
const app = express();
app.use(cors());
app.use(express.json());

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

app.post('/api/messages', async (req, res) => {
  const { id, name, message } = req.body;
  try {
    const newMessage = new Message({ id, name, message });
    await newMessage.save();
    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});

// user will make a get request to localhost:5000/api/messages/4fe96033-6cd9-4c0d-82d7-4f6c4e53c407
app.get('/api/messages/:id', async (req, res) => {
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
    res.status
  }
})

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
