import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import MyPopup from "../utils/MyPopup";

export default function LikePostButton({
  post: { id, likes, likeCount },
  user,
}) {
  //   const [errors, setErrors] = useState({});
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(error) {
      console.log(error);
    },
    update(_, result) {
      console.log("result = ", result);
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <>
      <Button as="div" labelPosition="right" onClick={likePost}>
        <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>
        <Label as="a" basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
