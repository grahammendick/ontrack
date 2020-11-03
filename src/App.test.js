import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import assert from 'assert';
import FetchContext from './FetchContext';
import App from './App';

const mockFetch = books => (
  (_, data) => ({
    then: () => ({
      then : fn => act(() => (
        fn(books[JSON.parse(data.body).page])
      ))
    })
  })
);

test('renders book list', () => {
  const fetch = mockFetch({
    '1' : {
      books: [
        {id: 1, book_title: 'book one'},
        {id: 2, book_title: 'book two'},
        {id: 3, book_title: 'book three'},
      ],
      count: 3
    }
  });
  const container = document.createElement('div');
  act(() => {
    ReactDOM.render(
      <FetchContext.Provider value={fetch}>
        <App />
      </FetchContext.Provider>,
      container);
  });
  const books = container.querySelectorAll('ul')[0];
  const titles = books.querySelectorAll('li');
  assert.strictEqual(titles.length, 3);
  assert.strictEqual(titles[0].innerHTML, 'book one');
  assert.strictEqual(titles[1].innerHTML, 'book two');
  assert.strictEqual(titles[2].innerHTML, 'book three');
});
