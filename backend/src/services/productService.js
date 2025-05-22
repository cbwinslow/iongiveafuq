const mongoose = require('mongoose');
const catchphraseService = require('./catchphraseService');
const imageGenerationService = require('./imageGenerationService');

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['fuck', 'damn', 'shit', 'darn', 'rat_ass'],
    required: true
  },
  character: {
    type: String,
    enum: ['scrapz', 'dumbo', 'patty', 'buzz', 'rizzo'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: String,
    path: String
  },
  catchphrase: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  subscription: {
    type: Boolean,
    default: false
  },
  subscriptionTier: {
    type: String,
    enum: ['basic', 'premium', 'elite']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    enum: ['basic', 'premium', 'elite'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  benefits: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  paymentMethodId: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);

class ProductService {
  constructor() {
    this.subscriptionTiers = {
      basic: {
        price: 9.99,
        benefits: [
          'Access to basic products',
          '10% discount on all purchases',
          'Monthly character interaction'
        ]
      },
      premium: {
        price: 19.99,
        benefits: [
          'Access to premium products',
          '20% discount on all purchases',
          'Weekly character interaction',
          'Exclusive merchandise'
        ]
      },
      elite: {
        price: 29.99,
        benefits: [
          'Access to all products',
          '30% discount on all purchases',
          'Daily character interaction',
          'Exclusive merchandise',
          'Custom catchphrase generation'
        ]
      }
    };
  }

  async createProduct(data) {
    const product = new Product({
      ...data,
      catchphrase: await catchphraseService.getRandomCatchphrase(data.character)
    });
    await product.save();
    return product;
  }

  async generatePurchaseImage(orderId) {
    const order = await Order.findById(orderId).populate('products');
    if (!order) throw new Error('Order not found');

    const product = order.products[0];
    const character = product.character;
    
    // Generate unique prompt based on purchase
    const prompt = `A ${character} character in adult cartoon style, 
      holding a QR code for order ${orderId}, 
      saying "Thanks for buying my ${product.type}!" with a ${product.catchphrase},
      in a grungy, dark background with neon accents,
      showing ${character} at human size interacting with the QR code`;

    const image = await imageGenerationService.generateImage(prompt, character);
    
    // Update order with image URL
    await Order.findByIdAndUpdate(orderId, {
      $set: {
        'products.0.image': {
          url: image.url,
          path: image.path
        }
      }
    });

    return image;
  }

  async createSubscription(userId, tier) {
    const subscriptionData = {
      userId,
      tier,
      price: this.subscriptionTiers[tier].price,
      benefits: this.subscriptionTiers[tier].benefits,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    };

    const subscription = new Subscription(subscriptionData);
    await subscription.save();
    return subscription;
  }

  async getSubscriptionBenefits(userId) {
    const subscription = await Subscription.findOne({ userId, status: 'active' });
    if (!subscription) return null;
    return {
      tier: subscription.tier,
      benefits: subscription.benefits,
      discount: this.subscriptionTiers[subscription.tier].price * 0.1
    };
  }
}

module.exports = new ProductService();
