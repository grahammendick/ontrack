import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.scss';

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
    <ListGroup as="ul">
      {books.map(({id, book_title}) => (
        <ListGroup.Item as="li" key={id}>
          {book_title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default App;
