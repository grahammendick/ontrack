import { useEffect, useState, useMemo } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import './App.scss';

function App() {
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pages = useMemo(() => {
    const lastPage = Math.ceil(count / 20);
    return count > 0 ? Array.from({length: 10}, (_, i) => (
       page - 5 + i 
        + (page - 5 < 1 ? 5 - page + 1 : 0)
        - (page + 4 > lastPage ? page + 4 - lastPage : 0)
    )) : [];  
  }, [count, page]);
  useEffect(() => {
    let cancel = false;
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
      if (!cancel) {
        setBooks(books);
        setCount(count);
      }
    });
    return () => cancel = true;
  }, [page]);
  const handlePageChange = e => {
    if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey && !e.button) {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        setPage(+e.target.text);
      }
    }
  };
  return (
    <>
      <h1>OnTrack tech test</h1>
      <ListGroup as="ul">
        {books.map(({id, book_title}) => (
          <ListGroup.Item as="li" key={id}>
            {book_title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination onClick={handlePageChange}>
        {pages.map(p => (
          <Pagination.Item active={p === page} href={`/${p}`} key={p}>
            {p}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}

export default App;
