const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Services
const catchphraseService = require('./services/catchphraseService');
const imageGenerationService = require('./services/imageGenerationService');
const paymentService = require('./services/paymentService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../storage')));

// Initialize services
imageGenerationService.initialize();

// Routes
app.get('/api/catchphrases/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const catchphrase = catchphraseService.getRandomCatchphrase(characterId);
    res.json({ catchphrase });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post('/api/images/generate', async (req, res) => {
  try {
    const { prompt, characterId } = req.body;
    const image = await imageGenerationService.generateImage(prompt, characterId);
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payment/intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await paymentService.createPaymentIntent(amount, currency);
    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    const { paymentIntentId, amount } = req.body;
    const isValid = await paymentService.verifyPayment(paymentIntentId, amount);
    res.json({ valid: isValid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
