import test from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import { Order } from './order.model.js';

test('Full-Stack Database Integration Suite', async (t) => {
  
  t.before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://127.0.0.1:27017/test_db');
    }
    await mongoose.connection.collections['orders']?.drop().catch(() => {});
    await Order.init();
  });

  t.beforeEach(async () => {
    await Order.deleteMany({});
  });

  t.after(async () => {
    await mongoose.connection.close();
  });

  await t.test('MongoDB should enforce unique index constraint on Idempotency Key', async () => {
    const mockOrderPayload = {
      userId: new mongoose.Types.ObjectId(),
      items: [{ productId: 'test_item', quantity: 1 }],
      totalAmount: 100,
      idempotencyKey: 'shared_duplicate_key_xyz'
    };

    const firstOrder = new Order(mockOrderPayload);
    await firstOrder.save();

    const duplicateOrder = new Order(mockOrderPayload);

    await assert.rejects(
      async () => {
        await duplicateOrder.save();
      },
      (err) => {
        return err.code === 11000;
      }
    );
  });
});
