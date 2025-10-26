
import express from 'express';
import Design from '../models/Design.js';
const router = express.Router();
router.get('/', async (req,res)=>{ const list = await Design.find().sort({ createdAt: -1 }); res.json(list); });
router.post('/', async (req,res)=>{ try{ const d = new Design(req.body); await d.save(); res.status(201).json(d); }catch(err){ res.status(400).json({ error: 'invalid', details: err.message }); } });
export default router;
