import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/quotes').then(res => {
      setQuotes(res.data);
    });
  }, []);

  const addQuote = () => {
    axios.post('http://localhost:5000/quotes', { text: newQuote }).then(res => {
      setQuotes([...quotes, res.data]);
      setNewQuote('');
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Quote Saver</h1>
      <input
        value={newQuote}
        onChange={e => setNewQuote(e.target.value)}
        placeholder="Enter a quote"
      />
      <button onClick={addQuote}>Add Quote</button>
      <ul>
        {quotes.map((quote, idx) => (
          <li key={idx}>{quote.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;