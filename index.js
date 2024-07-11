const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running, Deployment endpoints : Register : /api/auth/register , Login : /api/auth/login , Forgot Password : /api/auth/forgot-password , Example Data Form : Register : {"username": "user1", "email": "Provide-Your-Email", "password": "password123"} , Login: { "username":"user1", "password":"password123" }, Forgot Password {"email": "Provide-Your-Registered-Email"} ');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
