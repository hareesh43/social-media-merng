import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";

export default function Login(props) {
  const { onChange, onSubmit, values } = useForm(loginUserCredential, {
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      props.history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  function loginUserCredential() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login Form</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          onChange={onChange}
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
        />

        <Form.Input
          label="Password"
          placeholder="Password"
          onChange={onChange}
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login( username: $username, password: $password ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
