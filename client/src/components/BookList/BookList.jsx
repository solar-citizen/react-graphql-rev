import './BookList.css';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS_QUERY } from '../../requests/queries';
import BookDetails from '../BookDetails/BookDetails';

const BookList = () => {
  const [bookId, setBookId] = useState('');
  const [activeId, setActiveId] = useState('');

  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  const onBookClickHandler = (id) => {
    setActiveId(id);
    setBookId(id);
  };

  const renderBooks = () => {
    if (loading) return <li>Loading...</li>;
    if (error) return <li>Error</li>;

    return data.books.map((book) => (
      <li
        key={book.id}
        className={activeId === book.id ? 'active' : ''}
        onClick={() => onBookClickHandler(book.id)}
      >
        {book.name}
      </li>
    ));
  };

  return (
    <div>
      <ul id='book-list'>{renderBooks()}</ul>
      {bookId ? (
        <BookDetails bookId={bookId} />
      ) : (
        <span>No book selected...</span>
      )}
    </div>
  );
};

export default BookList;
