import { useEffect } from 'react';

const useHistory = (page, title, setPage, setTitle, setFilter) => {
  useEffect(() => {
    const getPage = () => +window.location.pathname.substring(1) || 1;
    const getTitle = () => (
      decodeURIComponent(window.location.search.substring(7))
    );
    const handleHistory = () => {
      setPage(getPage());
      setTitle(getTitle());
      setFilter(getTitle())
    };
    if (!page)
      handleHistory();
    if (page && (page !== getPage() || title !== getTitle())) {
      window.history.pushState(null, null, `/${page !== 1 ? page : ''}`
        + `${title ? '?title=' : ''}${encodeURIComponent(title)}`);
    }
    window.addEventListener('popstate', handleHistory);
    return () => window.removeEventListener('popstate', handleHistory);
  }, [page, title, setPage, setTitle, setFilter]);
};

export default useHistory;