// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import folderRoutes from './routes/folder.js';
import imageRoutes from './routes/image.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.COLLECTION_NAME}:${process.env.COLLECTION_PASSWORD}@cluster0.2dzmpza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/folder', folderRoutes);
app.use('/image', imageRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
