import React, { useState } from 'react';
import { Link ,Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    skills: '',
    password: '',
    confirmPassword: '',
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', data)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        navigate('/login');  // Redirect to login page after successful registration
      })
      .catch((error) => {
        console.error('There was an error registering the user!', error);
        if (error.response) {
          console.log('Server responded with:', error.response.data);
          console.log('Status code:', error.response.status);
        } else if (error.request) { 
          console.log('No response received:', error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  };
  


  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> Developers Hub
          </Link>
        </h1>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={submitHandler} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="fullname"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Mobile"
              name="mobile"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Skills"
              name="skills"
              onChange={changeHandler}
              required
            />
            <small className="form-text">
              Please provide skills separated by commas (e.g., HTML, CSS, JavaScript)
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={changeHandler}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
