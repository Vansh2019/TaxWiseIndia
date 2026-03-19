const express = require('express');
const router  = express.Router();
const { Contact, Subscriber, QuizResult } = require('../models');
const { sendContactConfirmation, notifyAdmin, sendWelcomeEmail } = require('../utils/email');

// ── CONTACT ──────────────────────────────────────────────────────────────────
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) return res.status(400).json({ success: false, message: 'All fields are required.' });
    if (name.length > 100) return res.status(400).json({ success: false, message: 'Name is too long.' });
    if (message.length > 2000) return res.status(400).json({ success: false, message: 'Message is too long.' });

    const contact = await Contact.create({ name, email, subject, message, ip: req.ip });
    await Promise.allSettled([
      sendContactConfirmation(email, name, subject),
      notifyAdmin(contact)
    ]);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});

// ── SUBSCRIBE ────────────────────────────────────────────────────────────────
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.status === 'unsubscribed') {
        existing.status = 'active';
        await existing.save();
        return res.json({ success: true, message: 'Welcome back! You\'ve been resubscribed.' });
      }
      return res.json({ success: true, message: 'You\'re already subscribed! 🎉' });
    }

    await Subscriber.create({ email, name: name || '' });
    await sendWelcomeEmail(email, name).catch(err => console.error('Welcome email failed:', err));
    res.json({ success: true, message: '🎉 Subscribed! Check your inbox for a welcome email.' });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});

// ── QUIZ RESULT ──────────────────────────────────────────────────────────────
router.post('/quiz', async (req, res) => {
  try {
    const { score, total, percentage } = req.body;
    if (typeof score !== 'number' || typeof total !== 'number') return res.status(400).json({ success: false });
    await QuizResult.create({ score, total, percentage: percentage || Math.round((score/total)*100) });
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

module.exports = router;
