import test from 'node:test';
import assert from 'node:assert';
import { createOrder } from './order.controller.js';
import { Order } from './order.model.js';

// Mocking helper for the Express Response object
const createMockResponse = () => {
  const res = {
    statusCode: 200,
    jsonPayload: null,
    status: function(code) {
      this.statusCode = code;
      return this; // Allows chaining: res.status().json()
    },
    json: function(payload) {
      this.jsonPayload = payload;
      return this;
    }
  };
  return res;
};

test('Backend Order Controller Tests', async (t) => {
  
  await t.test('should return 400 if Idempotency-Key header is missing', async () => {
    const req = { headers: {}, body: { userId: '123', items: [], totalAmount: 10 } };
    const res = createMockResponse();
    const next = () => {};

    await createOrder(req, res, next);

    assert.strictEqual(res.statusCode, 400);
    assert.match(res.jsonPayload.error, /Missing Idempotency-Key/);
  });

  await t.test('should return original order with 200 if duplicate key is found', async () => {
    const mockExistingOrder = { id: 'order_abc', idempotencyKey: 'key_123' };
    
    // Temporarily overwrite Mongoose findOne to pretend it found a duplicate
    const originalFindOne = Order.findOne;
    Order.findOne = async () => mockExistingOrder;

    const req = { 
      headers: { 'idempotency-key': 'key_123' }, 
      body: { userId: '123', items: [], totalAmount: 10 } 
    };
    const res = createMockResponse();

    await createOrder(req, res, createMockResponse);

    // Assertions
    assert.strictEqual(res.statusCode, 200);
    assert.match(res.jsonPayload.message, /Duplicate request detected/);

    // Restore original Mongoose method so we don't break other tests
    Order.findOne = originalFindOne;
  });
});
