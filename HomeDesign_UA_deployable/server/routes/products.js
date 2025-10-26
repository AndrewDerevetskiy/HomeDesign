
import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();
router.get('/', async (req,res)=>{
  const list = await Product.find().sort({ createdAt: -1 });
  res.json(list);
});
router.post('/', async (req,res)=>{
  try{
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  }catch(err){ res.status(400).json({ error: 'invalid data', details: err.message }); }
});
export default router;
