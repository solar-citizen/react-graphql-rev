import './BookDetails.css';
import { useQuery } from '@apollo/client';
import { GET_BOOK_QUERY } from '../../requests/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: { id: bookId },
  });

  const renderBookDetails = () => {
    if (loading) return <li>Loading...</li>;
    if (error) return <li>Error</li>;

    const { book } = data;

    if (book) {
      const authorBooks = book.author.books;
      return (
        <>
          <h2>{book.name}</h2>
          <span>Genre: {book.genre}</span>
          <span>Author: {book.author.name}</span>
          <span>All author's books:</span>
          <ul className='other-books'>
            {authorBooks.map((authorBooksItem) => {
              return <li key={authorBooksItem.id}>{authorBooksItem.name}</li>;
            })}
          </ul>
        </>
      );
    }
  };

  return <div id='book-details'>{renderBookDetails()}</div>;
};

export default BookDetails;
