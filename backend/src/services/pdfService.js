const PDFDocument = require('pdfkit');
const fs = require('fs').promises;
const path = require('path');
const qrcode = require('qrcode');
const imageGenerationService = require('./imageGenerationService');

const STORAGE_PATH = path.join(__dirname, '../storage/pdfs');

class PDFService {
  constructor() {
    this.storagePath = STORAGE_PATH;
  }

  async initialize() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (error) {
      console.error('Error creating PDF storage directory:', error);
      throw error;
    }
  }

  async generatePurchasePDF(orderId) {
    const order = await Order.findById(orderId).populate('products');
    if (!order) throw new Error('Order not found');

    const product = order.products[0];
    const character = product.character;

    // Generate QR code
    const qrCode = await qrcode.toDataURL(orderId);

    // Generate purchase image
    const image = await imageGenerationService.generateImage(
      `A ${character} character in adult cartoon style, 
      holding a QR code for order ${orderId}, 
      saying "Thanks for buying my ${product.type}!" with a ${product.catchphrase},
      in a grungy, dark background with neon accents,
      showing ${character} at human size interacting with the QR code`,
      character
    );

    // Create PDF
    const filename = `${orderId}_${Date.now()}.pdf`;
    const filePath = path.join(this.storagePath, filename);
    const doc = new PDFDocument();

    // Pipe to file
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add content
    doc
      .fontSize(24)
      .text('IonGiveAFuq Purchase Certificate', { align: 'center' })
      .moveDown()
      .fontSize(16)
      .text(`Order ID: ${orderId}`, { align: 'center' })
      .moveDown()
      .image(image.path, {
        fit: [500, 500],
        align: 'center',
        valign: 'center'
      })
      .moveDown()
      .text(`Character: ${character}`, { align: 'center' })
      .text(`Product: ${product.type}`, { align: 'center' })
      .text(`Catchphrase: ${product.catchphrase}`, { align: 'center' })
      .moveDown()
      .image(qrCode, {
        fit: [200, 200],
        align: 'center',
        valign: 'center'
      });

    doc.end();

    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    return {
      url: `/pdfs/${filename}`,
      path: filePath
    };
  }

  async generateSubscriptionPDF(subscriptionId) {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) throw new Error('Subscription not found');

    const filename = `subscription_${subscriptionId}_${Date.now()}.pdf`;
    const filePath = path.join(this.storagePath, filename);
    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc
      .fontSize(24)
      .text('IonGiveAFuq Subscription Certificate', { align: 'center' })
      .moveDown()
      .fontSize(16)
      .text(`Subscription ID: ${subscriptionId}`, { align: 'center' })
      .moveDown()
      .text(`Tier: ${subscription.tier}`, { align: 'center' })
      .moveDown()
      .text('Benefits:', { align: 'center' })
      .moveDown();

    subscription.benefits.forEach(benefit => {
      doc.text(`• ${benefit}`, { align: 'center' });
    });

    doc.end();

    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    return {
      url: `/pdfs/${filename}`,
      path: filePath
    };
  }
}

module.exports = new PDFService();
