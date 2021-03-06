import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Grid,
  Button,
  Card,
  Image,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/Auth";
import LikePostButton from "../component/LikePostButton";
import DeleteButton from "../component/DeleteButton";

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const [commentText, setCommentText] = useState("");

  const { data: { getPost } = {} } = useQuery(FETCH_GET_POST_QUERY, {
    variables: {
      postId: postId,
    },
  });

  const [submitComment] = useMutation(ADD_COMMENT_MUTATION, {
    update() {
      setCommentText("");
    },
    variables: { postId, body: commentText },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };
  let postMarkup;

  console.log(getPost);

  if (!getPost) {
    postMarkup = <p>Loading the post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likeCount,
      commentCount,
      likes,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              float="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikePostButton user={user} post={{ id, likes, likeCount }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment post ")}
                >
                  <Button color="blue" basic>
                    <Icon name="comments" />
                    <Label basic color="blue" poining="left">
                      {commentCount}
                    </Label>
                  </Button>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="comment..."
                        name="comment"
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={commentText.trim() === ""}
                        onClick={submitComment}
                      >
                        Add Comment
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}

            {comments &&
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                    {user && user.username === username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                  </Card.Content>
                </Card>
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  // } else {
  //   postMarkup = <p> the post is not able to fetch...</p>;
  // }

  return postMarkup;
}

const ADD_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        body
      }
      commentCount
    }
  }
`;

const FETCH_GET_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        username
        createdAt
        body
      }
      likeCount
      commentCount
      likes {
        id
      }
    }
  }
`;
