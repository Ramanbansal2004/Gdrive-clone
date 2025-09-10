// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import folderRoutes from './routes/folder.js';
import imageRoutes from './routes/image.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(`mongodb+srv://${process.env.COLLECTION_NAME}:${process.env.COLLECTION_PASSWORD}@cluster0.2dzmpza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/folder', folderRoutes);
app.use('/image', imageRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
