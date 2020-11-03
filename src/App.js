import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import './App.scss';

function App() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch('http://nyx.vima.ekt.gr:3000/api/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page,
        itemsPerPage: 20,
        filters: []
      })
    })
    .then(res => res.json())
    .then(({books}) => setBooks(books))
  }, [page]);
  return (
    <>
      <ListGroup as="ul">
        {books.map(({id, book_title}) => (
          <ListGroup.Item as="li" key={id}>
            {book_title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination onClick={e => {
        if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey && !e.button) {
          e.preventDefault();
          setPage(20);
        }
      }}>
        <Pagination.Item href="/2">{2}</Pagination.Item>
      </Pagination>
    </>
  );
}

export default App;
