import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Contact form API endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const submissionDate = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
    
    // Construct email html
    const emailHtml = `
      <h2>New Contact Form Submission - Artisan Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Date & Time:</strong> ${submissionDate}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Artisan Portfolio <onboarding@resend.dev>', // Resend's default testing domain
      to: ['vanjinathanvanji925@gmail.com'],
      subject: `New Contact: ${subject}`,
      html: emailHtml,
      replyTo: email, // Set reply-to to the visitor's email
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: 'Failed to send email via Resend.' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Waiting Room API endpoint
app.post('/api/waiting-room', async (req, res) => {
  const { slotId, name, email, craftType, vision, timeline } = req.body;

  if (!name || !email || !craftType || !vision) {
    return res.status(400).json({ error: 'Required fields are missing.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const submissionDate = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
    
    const emailHtml = `
      <h2>New Waiting Room Reservation - Artisan Portfolio</h2>
      <p><strong>Slot ID:</strong> SLOT-00${slotId}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Craft Type:</strong> ${craftType}</p>
      <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
      <p><strong>Date & Time:</strong> ${submissionDate}</p>
      <hr />
      <h3>Vision:</h3>
      <p>${vision.replace(/\n/g, '<br />')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Artisan Portfolio <onboarding@resend.dev>',
      to: ['vanjinathanvanji925@gmail.com'],
      subject: `New Reservation: SLOT-00${slotId}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: 'Failed to send email via Resend.' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
