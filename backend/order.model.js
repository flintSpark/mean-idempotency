import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  totalAmount: { type: Number, required: true },
  idempotencyKey: { type: String, required: true, unique: true }, 
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
