import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Filter({filter, setFilter, setTitle, setPage}) {
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={filter}
          onChange={e => setFilter(e.target.value)} />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={() => {
          setPage(1);
          setTitle(filter);
        }}>
        Search
      </Button>
    </Form>
  );
}

export default Filter;
