import { useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Pager({count, page, setPage}) {
  const pages = useMemo(() => {
    const lastPage = Math.ceil(count / 20);
    const start = 5 - Math.min(0, lastPage - (page + 4));
    return count > 0 ? Array.from({length: Math.min(lastPage, 10)}, (_, i) => (
       page - start + i + (page - start < 1 ? start - page + 1 : 0)
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
