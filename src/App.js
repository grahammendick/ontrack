import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch('http://nyx.vima.ekt.gr:3000/api/books', {
      method: 'POST',
      body: JSON.stringify({
          page: 1,
          itemsPerPage: 20,
          filters: []
        }
      )
    })
    .then(res => res.json())
    .then(({books}) => setBooks(books))
  }, []);
  return (
    <ul>
      {books.map(({id, book_title}) => (
        <li key={id}>{book_title}</li>
      ))}
    </ul>
  );
}

export default App;
