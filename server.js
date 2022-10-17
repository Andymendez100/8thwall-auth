const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('success');
});

const authorizedURL = [
  'https://www.8thwall.com/v2x/js-battery-breakdown/files/app.js',
  'https://tonyqnguyen-tony-v2x.dev.8thwall.app/js-battery-breakdown/',
];

app.post('/verifyAR', (req, res) => {
  const { referrer } = req.body;
  console.log('referrer', referrer, authorizedURL.includes(referrer));
  if (authorizedURL.includes(referrer)) {
    res.status(200).send('Allow Access');
  } else {
    console.log('deny');
    res.status(403).send('Deny Access');
  }
});
app.post('/tony', (req, res) => {
  res.cookie('test', JSON.stringify({ user: 'tony' }), {
    // domain: '.balboadigital.com',
    // maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.send('Congrats Tony');
});
app.listen(PORT, () => {
  console.log(`Express server running on port: ${PORT}`);
});
