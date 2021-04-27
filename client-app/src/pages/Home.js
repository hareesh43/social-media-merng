import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../component/PostCard";
import PostForm from "../component/PostForm";
import { AuthContext } from "../context/Auth";

import { FETCH_GET_POSTS } from "../utils/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data:{getPosts} = {} } = useQuery(FETCH_GET_POSTS);
  console.log(getPosts)

  return (
    <Grid columns={3}>
      <Grid.Row className="post-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h2>Loging Posts ...</h2>
        ) : (
          <Transition.Group>
            {getPosts &&
              getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}
