import { gql } from '@apollo/client';

export const GET_AUTHORS_QUERY = gql`
  query GetAuthorsQuery {
    authors {
      name
      id
    }
  }
`;

export const GET_BOOKS_QUERY = gql`
  query GetBooksQuery {
    books {
      name
      id
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query GetBookQuery($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
