import './AddBook.css';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_AUTHORS_QUERY, GET_BOOKS_QUERY } from '../../requests/queries';
import { ADD_BOOK_MUTATION } from '../../requests/mutations';

const AddBook = () => {
  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAuthorId, setBookAuthorId] = useState('');

  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
  const [
    addBookMutation,
    { loading: addBookMutationLoading, error: addBookMutationError },
  ] = useMutation(ADD_BOOK_MUTATION, {
    update(cache, { data }) {
      console.log(data);
      const { books } = cache.readQuery({
        query: GET_BOOKS_QUERY,
      });

      cache.writeQuery({
        query: GET_BOOKS_QUERY,
        data: {
          books: [...books, data.addBook],
        },
      });
    },
  });

  const renderAuthors = () => {
    if (loading) return <option disabled>Loading...</option>;
    if (error) return <option disabled>Error</option>;

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const onChangeBookHandler = (e) => {
    setBookName(e.target.value);
  };

  const onChangeGenreHandler = (e) => {
    setBookGenre(e.target.value);
  };

  const onChangeAuthorIdHandler = (e) => {
    setBookAuthorId(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId: bookAuthorId,
      },
    });
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className='form-field'>
          <label>Book name:</label>
          <input
            type='text'
            required
            onChange={(e) => onChangeBookHandler(e)}
          />
        </div>

        <div className='form-field'>
          <label>Genre:</label>
          <input
            type='text'
            required
            onChange={(e) => onChangeGenreHandler(e)}
          />
        </div>

        <div className='form-field'>
          <label>Author:</label>
          <select required onChange={(e) => onChangeAuthorIdHandler(e)}>
            <option>Select author</option>
            {renderAuthors()}
          </select>
        </div>

        <button type='submit'>+</button>
      </form>
      {addBookMutationLoading && <span>Loading...</span>}
      {addBookMutationError && <span>Error. Please try again later.</span>}
    </>
  );
};

export default AddBook;
