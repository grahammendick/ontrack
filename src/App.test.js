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

test('renders pager links', () => {
  const fetch = mockFetch({
    '1' : {
      books: Array.from({length: 20}, (_, i) => (
        {id: i, book_title: `book ${i}`}
      )),
      count: 250
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
  const pager = container.querySelectorAll('ul')[1];
  const pages = pager.querySelectorAll('li a');
  assert.strictEqual(pages.length, 9);
  assert.strictEqual(pages[0].innerHTML, '2');
  assert.strictEqual(pages[1].innerHTML, '3');
  assert.strictEqual(pages[2].innerHTML, '4');
  assert.strictEqual(pages[3].innerHTML, '5');
  assert.strictEqual(pages[4].innerHTML, '6');
  assert.strictEqual(pages[5].innerHTML, '7');
  assert.strictEqual(pages[6].innerHTML, '8');
  assert.strictEqual(pages[7].innerHTML, '9');
  assert.strictEqual(pages[8].innerHTML, '10');
});
