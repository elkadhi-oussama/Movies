import React , { useState }from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { addErrors, delErrors } from "../../Redux/Slice/manipulationSlice";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { changeEtat } from '../../Redux/Slice/changeStateSlice';
const LoginUser = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
      });
      const handleChange = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value });
      };
    
      const errorsHandler = useSelector((state) => state.manipulation.value);
      
    
      const dispatch = useDispatch();
    
      const loginUser = (event) => {
        event.preventDefault();
        axios
          .post("https://movies-application-api.vercel.app/user/login", newUser)
          .then((result) => {
            // Store the user token in local storage
            localStorage.setItem("auth", result.data.userToken);
            // Clear any previous validation errors
            dispatch(delErrors());
            dispatch(changeEtat())
            navigate("/movie")
            setNewUser({
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
    <Form onSubmit={loginUser}>
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
        Login
      </Button>
    </Form>
    <p>
        If you don't have an account you can{" "}
        <span>
          <Link to={"/register"}>register here</Link>
        </span>
      </p>
    {errorsHandler &&
      errorsHandler.map((error, index) => (
        <p key={index} style={{ color: "red" }}>
          {error}
        </p>
      ))}
  </div>
  )
}

export default LoginUser