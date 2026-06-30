import { Order } from './order.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const idempotencyKey = req.headers['idempotency-key'];
    const { userId, items, totalAmount } = req.body;

    if (!idempotencyKey) {
      return res.status(400).json({ error: 'Missing Idempotency-Key header.' });
    }
    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ error: 'Missing required order fields.' });
    }

    const existingOrder = await Order.findOne({ idempotencyKey });
    if (existingOrder) {
      return res.status(200).json({ 
        message: 'Duplicate request detected. Returning original order.',
        order: existingOrder 
      });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      idempotencyKey,
      status: 'completed'
    });

    await newOrder.save();

    return res.status(201).json({
      message: 'Order processed successfully.',
      order: newOrder
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Order processing in progress or already completed.' });
    }
    next(error); 
  }
};
