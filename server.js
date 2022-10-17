const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://8thwall.tonytnguyen.dev',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('success');
});

const authorizedURL = [
  'https://www.8thwall.com/v2x/js-battery-breakdown/files/app.js',
  'https://tonyqnguyen-tony-v2x.dev.8thwall.app/js-battery-breakdown/',
  'https://www.8thwall.com/',
];

app.post('/verifyAR', (req, res) => {
  const { referrer } = req.body;
  console.log('referrer', referrer, authorizedURL.includes(referrer));
  if (authorizedURL.includes(referrer)) {
    console.log('req.headers.authorization', req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    jwt.verify(req.headers.authorization, 'shhhhh', function (err, decoded) {
      if (err) return res.status(403).json({ error: 'Invalid JWT!' });
      res.status(200).json({ error: false });
    });
  } else {
    console.log('deny');
    res.status(403).send({ error: 'who r u' });
  }
});
app.post('/tony', (req, res) => {
  const token = jwt.sign({ user: 'tony' }, 'shhhhh');

  res.cookie('test', token, {
    domain: '.tonytnguyen.dev',
    sameSite: true,
    secure: true,
  });
  res.send('Congrats Tony');
});
app.listen(PORT, () => {
  console.log(`Express server running on port: ${PORT}`);
});
