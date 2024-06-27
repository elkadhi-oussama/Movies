import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addErrors, delErrors } from "../../Redux/Slice/manipulationSlice";
import { Link, useNavigate } from "react-router-dom";
import { changeEtat } from "../../Redux/Slice/changeStateSlice";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const errorsHandler = useSelector((state) => state.manipulation.value);

  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    axios
      .post("https://movies-application-api.vercel.app/user/register", newUser)
      .then((result) => {
        // Store the user token in local storage
        localStorage.setItem("auth", result.data.userToken);
        // Clear any previous validation errors
        dispatch(delErrors());
        navigate("/movie");
        dispatch(changeEtat());
        setNewUser({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        // Set validation errors if registration fails
        dispatch(
          addErrors(
            err.response.data.msg
              ? [err.response.data.msg]
              : err.response.data.errors
          )
        );
      });
  };
  return (
    <div className="RegisterUser">
      <Form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            name="username"
            value={newUser.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => handleChange(e)}
            value={newUser.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={newUser.password}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        If you have an account, you can{" "}
        <span>
          <Link to="/login">login here</Link>
        </span>
      </p>
      {errorsHandler &&
        errorsHandler.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
    </div>
  );
};

export default RegisterUser;
