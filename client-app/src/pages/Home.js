import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../component/PostCard";

export default function Home() {
  const { loading, data } = useQuery(query);
  const posts = data.getPosts;
 
  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h2>Loging Posts ...</h2>
        ) : (
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const query = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        username
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
