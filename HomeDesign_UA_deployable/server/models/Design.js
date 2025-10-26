
import mongoose from 'mongoose';
const DesignSchema = new mongoose.Schema({
  title: String,
  user: String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      position: { x: Number, y: Number, z: Number },
      rotation: { x: Number, y: Number, z: Number },
      scale: { x: Number, y: Number, z: Number }
    }
  ],
  snapshotUrl: String
}, { timestamps: true });
export default mongoose.model('Design', DesignSchema);
