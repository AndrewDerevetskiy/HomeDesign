
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import designRoutes from './routes/designs.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const MONGO = process.env.MONGO_URI;
if(!MONGO){ console.error('MONGO_URI not set. Please set MONGO_URI environment variable to your MongoDB Atlas connection string.'); process.exit(1); }

mongoose.connect(MONGO).then(()=> console.log('MongoDB connected')).catch(err=>{ console.error(err); process.exit(1); });

app.use('/api/products', productRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req,res)=> res.send('HomeDesign API OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
