const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true, maxlength: 100 },
  email:     { type: String, required: true, trim: true, lowercase: true },
  subject:   { type: String, required: true, trim: true },
  message:   { type: String, required: true, trim: true, maxlength: 2000 },
  status:    { type: String, enum: ['new','read','replied'], default: 'new' },
  ip:        String,
  createdAt: { type: Date, default: Date.now }
});

const subscriberSchema = new mongoose.Schema({
  email:        { type: String, required: true, unique: true, trim: true, lowercase: true },
  name:         { type: String, trim: true, default: '' },
  status:       { type: String, enum: ['active','unsubscribed'], default: 'active' },
  subscribedAt: { type: Date, default: Date.now }
});

const quizResultSchema = new mongoose.Schema({
  score:      { type: Number, required: true },
  total:      { type: Number, required: true },
  percentage: { type: Number, required: true },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = {
  Contact:    mongoose.model('Contact', contactSchema),
  Subscriber: mongoose.model('Subscriber', subscriberSchema),
  QuizResult: mongoose.model('QuizResult', quizResultSchema)
};
