require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const app = express();
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});
app.use(cors({ origin: ['https://velvetpow.vercel.app','http://localhost:5173'],credentials: true }));  // your Vite frontend
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/featured',    require('./routes/featured'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));