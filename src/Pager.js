import { useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Pager({count, page, setPage}) {
  const pages = useMemo(() => {
    const lastPage = Math.ceil(count / 20);
    return count > 0 ? Array.from({length: Math.min(lastPage, 10)}, (_, i) => (
       page - 5 + i 
        + (page - 5 < 1 ? 5 - page + 1 : 0)
        - (page - 5 > 0 && page + 4 > lastPage ? page + 4 - lastPage : 0)
    )) : [];  
  }, [count, page]);
  const handlePageChange = e => {
    if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey && !e.button) {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        setPage(+e.target.text);
      }
    }
  };
  return (
    <Pagination onClick={handlePageChange}>
    {pages.map(p => (
        <Pagination.Item active={p === page} href={`/${p}`} key={p}>
        {p}
        </Pagination.Item>
    ))}
    </Pagination>
  );
}

export default Pager;
