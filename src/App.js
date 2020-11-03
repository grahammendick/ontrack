import { useEffect, useState, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Filter from './Filter';
import Pager from './Pager';
import FetchContext from './FetchContext';
import useHistory from './useHistory';
import './App.scss';

function App() {
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(null);
  const [filter, setFilter] = useState('');
  const [title, setTitle] = useState('');
  const fetch = useContext(FetchContext);
  useHistory(page, title, setPage, setTitle, setFilter);
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
        filters: [{type: "all", values: [title]}]
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
  }, [page, title, setBooks, setCount, fetch]);
  return (
    <>
      <h1>OnTrack tech test</h1>
      <Filter
        filter={filter}
        setFilter={setFilter}
        setTitle={setTitle}
        setPage={setPage} />
      <ListGroup as="ul">
        {books.map(({id, book_title}) => (
          <ListGroup.Item as="li" key={id}>
            {book_title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pager
        count={count}
        page={page}
        title={title}
        setPage={setPage} />
    </>
  );
}

export default App;
