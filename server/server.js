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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/folder', folderRoutes);
app.use('/image', imageRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
