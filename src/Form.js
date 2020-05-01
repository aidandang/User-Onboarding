import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

// set account information schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .min(5, "Username must be at least 6 characters long.")
    .required("Username is must"),
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup
    .string()
    .min(6, "Password must have at least 8 characters.")
    .required(),
  term: Yup
    .boolean()
    .oneOf([true], "You must agree to the Term of Service.")
});

export default function Form(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    term: false
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    term: false
  })
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [users, setUsers] = useState([]);

  const onInputChange = e => {
    e.persist();

    const newFormData = {
      ...formData, [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    }
    validateChange(e);
    setFormData(newFormData);
  }

  const validateChange = e => {
    Yup
      .reach(formSchema, e.target.id)
      .validate(e.target.value)
      .then(valid => {
        setErrors({...errors, [e.target.id]: ""})
      })
      .catch(err => {
        setErrors({...errors, [e.target.id]: err.errors[0]})
      })
  }

  useEffect(() => {
    formSchema.isValid(formData)
      .then(valid => {
        setButtonDisabled(!valid);
      });
  }, [formData]);

  const formSubmit = e => {
    e.preventDefault();
    axios.post('https://reqres.in/api/users', formData)
      .then(res => {
        if (res.data.name) {
          let arr = users;
          arr.push(res.data.name);
          setUsers(arr);
        }
        setFormData({
          name: "",
          email: "",
          password: "",
          term: false
        })
      })
  }

  console.log(users);
  return <>
    <div className="card my-5">
      <div className="card-header">
        Log In
      </div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <form onSubmit={formSubmit}>
          <div className="row">
            <div className="col-sm-7">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name"
                  value={formData.name}
                  placeholder="Name" 
                  onChange={onInputChange} 
                />
                {errors.name.length > 0 ? <p className="mt-2 text-danger">{errors.name}</p> : null}
              </div>
            </div>
            <div className="col-sm-7">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  value={formData.email}
                  aria-describedby="emailHelp" 
                  placeholder="Email"
                  onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={onInputChange} 
                />
              </div>
            </div>
            <div className="col-sm-7">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="term" 
                  onChange={onInputChange}
                  checked={formData.term}
                  />
                <label className="form-check-label" htmlFor="term">Term of Service</label>
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className={`btn btn-${buttonDisabled ? 'secondary' : 'primary'} my-4`}
            disabled={buttonDisabled}
          >
            Submit
          </button>
        </form>
        <pre className="card-text">{users.length > 0 ? JSON.stringify(users, null, 2) : null}</pre>
      </div>
    </div>
  </>
}