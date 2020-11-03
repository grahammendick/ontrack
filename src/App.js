import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import './App.scss';

function App() {
  const [books, setBooks] = useState([]);
  const [number, setCount] = useState(0);
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
    .then(({books, count}) => {
      setBooks(books);
      setCount(count);
    })
  }, [page]);
  const lastPage = Math.ceil(2425 / 20);
  const pages = Array.from({length: 10}, (_, i) => (
     page - 5 + i 
      + (page - 5 < 1 ? 5 - page + 1 : 0)
      + (page + 4 > lastPage ? page - lastPage : 0)
  ));
  console.log(pages)
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
          setPage(+e.target.text);
        }
      }}>
        {pages.map(page => (
          <Pagination.Item href={`/${page}`} key={page}>
            {page}
          </Pagination.Item>
        ))}
        
      </Pagination>
    </>
  );
}

export default App;
