import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { FETCH_GET_POSTS } from "../utils/graphql";

export default function PostForm() {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_GET_POSTS,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_GET_POSTS,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });

      values.body = "";
    },
  });
  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form noValidate onSubmit={onSubmit}>
        <h2>Create Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi there"
            onChange={onChange}
            name="body"
            error={error ? true : false}
            value={values.body}
          />
        </Form.Field>
        <Button type="submit" primary>
          Create Post
        </Button>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        createdAt
        username
      }
      comments {
        body
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`;
