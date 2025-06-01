const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'simkova54321@gmail.com',
    pass: process.env.EMAIL_PASS // You'll need to set this in .env
  }
});

// Routes
app.post('/api/reservations', upload.single('reservationFile'), async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const file = req.file;

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Potvrzení rezervace - Vodáci Hronov',
      text: `Vážený/á ${name},\n\n
děkujeme za vaši rezervaci. Potvrzujeme její přijetí.\n
Vaše rezervace bude zpracována a budeme vás kontaktovat na emailu ${email} nebo telefonu ${phone}.\n\n
S pozdravem,\n
Vodáci Hronov`
    });

    // Send notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Nová rezervace - Vodáci Hronov',
      text: `Nová rezervace od ${name}\n
Email: ${email}\n
Telefon: ${phone}\n
Poznámka: ${message || 'Žádná poznámka'}\n\n
Vyplněný formulář je připojen k tomuto emailu.`,
      attachments: file ? [{
        filename: file.originalname,
        path: file.path
      }] : []
    };

    await transporter.sendMail(adminMailOptions);

    res.json({ success: true, message: 'Rezervace byla úspěšně odeslána' });
  } catch (error) {
    console.error('Error processing reservation:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Něco se pokazilo při zpracování rezervace' 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 