const nodemailer = require('nodemailer');

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
}

const SITE  = () => process.env.SITE_URL || 'http://localhost:3000';
const EMAIL = () => process.env.EMAIL_USER || 'vanshmahajan8082@gmail.com';

const wrap = (body) => `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TaxWise India</title></head>
<body style="margin:0;padding:20px;background:#060b14;font-family:Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;background:#0d1420;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
  <div style="background:linear-gradient(135deg,#00d68f15,#060b14);padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <div style="display:inline-flex;align-items:center;gap:10px;">
      <div style="width:32px;height:32px;background:#00d68f;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;color:#060b14;font-size:15px;vertical-align:middle;">₹</div>
      <span style="font-weight:800;font-size:17px;color:#e8f0fe;vertical-align:middle;">Tax<span style="color:#00d68f;">Wise</span> India</span>
    </div>
  </div>
  <div style="padding:28px;">${body}</div>
  <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
    <p style="color:#3a4555;font-size:11px;margin:0;">© 2025 TaxWise India &nbsp;·&nbsp;
      <a href="mailto:${EMAIL()}" style="color:#3a4555;">${EMAIL()}</a> &nbsp;·&nbsp;
      <a href="${SITE()}/privacy-policy" style="color:#3a4555;">Privacy Policy</a></p>
  </div>
</div></body></html>`;

async function sendContactConfirmation(to, name, subject) {
  await getTransporter().sendMail({
    from: `"TaxWise India" <${EMAIL()}>`,
    to,
    subject: `✅ We received your message — TaxWise India`,
    html: wrap(`
      <h2 style="color:#e8f0fe;font-size:20px;margin:0 0 12px;">Hi ${name}! 👋</h2>
      <p style="color:#8a9bbf;font-size:14px;line-height:1.7;margin:0 0 12px;">We've received your message about <strong style="color:#e8f0fe;">"${subject}"</strong>.</p>
      <p style="color:#8a9bbf;font-size:14px;line-height:1.7;margin:0 0 20px;">We'll reply to <strong style="color:#00d68f;">${to}</strong> within 2–3 business days.</p>
      <a href="${SITE()}" style="display:block;background:#00d68f;color:#060b14;text-align:center;padding:13px;border-radius:10px;font-weight:800;font-size:14px;text-decoration:none;">Visit TaxWise India →</a>`)
  });
}

async function notifyAdmin(c) {
  await getTransporter().sendMail({
    from: `"TaxWise Contact" <${EMAIL()}>`,
    to: EMAIL(),
    subject: `📬 New Message: ${c.subject} — from ${c.name}`,
    html: wrap(`
      <h2 style="color:#00d68f;font-size:17px;margin:0 0 16px;">📬 New Contact Form Submission</h2>
      <p style="color:#8a9bbf;font-size:14px;margin:4px 0;"><strong style="color:#e8f0fe;">Name:</strong> ${c.name}</p>
      <p style="color:#8a9bbf;font-size:14px;margin:4px 0;"><strong style="color:#e8f0fe;">Email:</strong> <a href="mailto:${c.email}" style="color:#00d68f;">${c.email}</a></p>
      <p style="color:#8a9bbf;font-size:14px;margin:4px 0;"><strong style="color:#e8f0fe;">Subject:</strong> ${c.subject}</p>
      <p style="color:#8a9bbf;font-size:14px;margin:12px 0 4px;"><strong style="color:#e8f0fe;">Message:</strong></p>
      <p style="color:#8a9bbf;font-size:14px;line-height:1.7;background:#060b14;padding:12px;border-radius:8px;">${c.message}</p>
      <a href="mailto:${c.email}?subject=Re: ${c.subject}" style="display:inline-block;margin-top:16px;background:#00d68f;color:#060b14;padding:10px 20px;border-radius:8px;font-weight:bold;font-size:14px;text-decoration:none;">Reply →</a>`)
  });
}

async function sendWelcomeEmail(to, name) {
  await getTransporter().sendMail({
    from: `"TaxWise India" <${EMAIL()}>`,
    to,
    subject: `🎉 Welcome to TaxWise India Newsletter!`,
    html: wrap(`
      <div style="text-align:center;margin-bottom:16px;font-size:44px;">🎉</div>
      <h2 style="color:#e8f0fe;font-size:20px;text-align:center;margin:0 0 12px;">Welcome${name ? ', '+name : ''}!</h2>
      <p style="color:#8a9bbf;font-size:14px;line-height:1.7;text-align:center;margin:0 0 20px;">You're now subscribed to India's simplest tax & finance newsletter.</p>
      <div style="background:#060b14;border-radius:10px;padding:16px;margin-bottom:20px;border:1px solid rgba(0,214,143,0.15);">
        <p style="color:#8a9bbf;font-size:13px;margin:4px 0;">📋 Weekly tax deadline reminders</p>
        <p style="color:#8a9bbf;font-size:13px;margin:4px 0;">💰 New tax-saving strategies</p>
        <p style="color:#8a9bbf;font-size:13px;margin:4px 0;">📈 Investment tips for young Indians</p>
        <p style="color:#8a9bbf;font-size:13px;margin:4px 0;">🔔 Budget & policy updates</p>
      </div>
      <a href="${SITE()}" style="display:block;background:#00d68f;color:#060b14;text-align:center;padding:13px;border-radius:10px;font-weight:800;font-size:14px;text-decoration:none;">Explore TaxWise India →</a>`)
  });
}

module.exports = { sendContactConfirmation, notifyAdmin, sendWelcomeEmail };
