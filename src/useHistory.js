import { useEffect } from 'react';

const useHistory = (page, title, setPage, setTitle, setFilter) => {
  useEffect(() => {
    const getPage = () => +window.location.pathname.substring(1) || 1;
    const getTitle = () => window.location.search.substring(7);
    if (!page) {
      setPage(getPage());
      setTitle(getTitle())
      setFilter(getTitle())
    }
    if (page && (page !== getPage() || title !== getTitle()))
      window.history.pushState(null, null, 
        `/${page !== 1 ? page : ''}${title ? '?title=' : ''}${title}`);
    const handlePopState = () => {
      setPage(getPage());
      setTitle(getTitle());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [page, title, setPage, setTitle, setFilter]);
};

export default useHistory;