const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
require('dotenv').config();

class PaymentService {
  constructor() {
    this.stripe = stripe;
    this.jwtSecret = process.env.JWT_SECRET;
  }

  async createPaymentIntent(amount, currency = 'usd') {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async verifyPayment(paymentIntentId, amount) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded' && paymentIntent.amount === amount) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }

  generatePaymentToken(userId, amount, currency) {
    const token = jwt.sign(
      {
        userId,
        amount,
        currency,
        timestamp: Date.now()
      },
      this.jwtSecret,
      { expiresIn: '1h' }
    );
    return token;
  }

  verifyPaymentToken(token) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired payment token');
    }
  }
}

module.exports = new PaymentService();
