const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const QuoteSchema = new mongoose.Schema({ text: String });
const Quote = mongoose.model('Quote', QuoteSchema);

app.get('/quotes', async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

app.post('/quotes', async (req, res) => {
  const newQuote = new Quote({ text: req.body.text });
  await newQuote.save();
  res.json(newQuote);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));