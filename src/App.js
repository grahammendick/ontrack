import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pager from './Pager';
import './App.scss';

const useHistory = (page, setPage) => {
  useEffect(() => {
    const getPage = () => +window.location.pathname.substring(1) || 1;
    if (!page)
      setPage(getPage());
    if (page && page !== getPage())
      window.history.pushState(null, null, `/${page !== 1 ? page : ''}`);
    const handlePopState = () => setPage(getPage());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [page, setPage]);
};

function App() {
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(null);
  useHistory(page, setPage);
  useEffect(() => {
    if (!page)
      return;
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
  }, [page, setBooks, setCount]);
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
      <Pager count={count} page={page} setPage={setPage} />
    </>
  );
}

export default App;
