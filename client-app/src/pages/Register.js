import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log("result = ", result);
    },
    onError(error) {
      console.log(error.graphQLErrors[0].extensions.errors);
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register Form</h1>
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
          label="Email"
          placeholder="Email"
          onChange={onChange}
          name="email"
          type="text"
          error={errors.email ? true : false}
          value={values.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={onChange}
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
        />
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
