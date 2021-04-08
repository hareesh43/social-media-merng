import gql from "graphql-tag";

export const FETCH_GET_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        username
        body
      }
      likeCount
      commentCount
      likes {
        id
        createdAt
        username
      }
    }
  }
`;
