
import express from 'express';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.v2.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.CLOUD_KEY, api_secret: process.env.CLOUD_SECRET });
const router = express.Router();
router.post('/snapshot', async (req,res)=>{
  try{
    const { imageBase64 } = req.body;
    const base64Data = imageBase64.split(',')[1];
    const uploadFromBuffer = (buffer) => new Promise((resolve,reject)=>{
      const stream = cloudinary.v2.uploader.upload_stream({ folder: 'homedesign/snapshots' }, (error,result)=>{
        if(result) resolve(result); else reject(error);
      });
      streamifier.createReadStream(buffer).pipe(stream);
    });
    const result = await uploadFromBuffer(Buffer.from(base64Data,'base64'));
    res.json({ url: result.secure_url });
  }catch(e){ console.error(e); res.status(500).json({ error: e.message }); }
});
export default router;
