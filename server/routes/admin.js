const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;

  // simple password check
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

module.exports = router;