import { gql } from '@apollo/client';

export const ADD_BOOK_MUTATION = gql`
  mutation AddBookMutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
