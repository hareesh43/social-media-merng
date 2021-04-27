import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";

import { FETCH_GET_POSTS } from "../utils/graphql";
import MyPopup from "../utils/MyPopup";

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_GET_POSTS,
        });

        // data.getPosts = data.getPosts.filter((p) => p.id !== postId);

        let newData = [...data.getPosts];
        newData = newData.filter((p) => p.id !== postId);

        proxy.writeQuery({
          query: FETCH_GET_POSTS,
          data: {
            ...data,
            getPosts: {
              newData,
            },
          },
        });
      }

      if (callback) callback();
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <MyPopup content={commentId ? "Delete Comment" : "Delete Post"}>
        <Button
          color="red"
          style={{ margin: 0 }}
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;
