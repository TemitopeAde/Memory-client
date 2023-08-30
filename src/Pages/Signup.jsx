import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./pages.css";
import { signup } from '../state/actions';
import Loader from '../Components/Loader';

const Signup = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  console.log(loading);

  const submitForm = (values) => {
    dispatch(signup(values));
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }

    if (!values.firstName) {
      errors.firstName = "First name is required"
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required"
    }

    if (!values.password) {
      errors.password = "Password is required";
    } 

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } 

    if (values.password !== values.confirmPassword) {
      errors.password = "Passwords do not match";
    }

    return errors;
  };

  if (loading) return <Loader />

  return (
    <div>
      <div className="container">
        <h2>Registration Form</h2>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={submitForm}
        >
          {
            (formik) => {
              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                dirty,
              } = formik;
              return (
                <Form>
                  <div className="form-group">
                    <label htmlFor="">First name</label>
                    <Field
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.firstName &&
                          touched.firstName
                          ? "input-error form-control"
                          : "form-control"
                      }
                    >
                      
                    </Field>
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Last name</label>
                    <Field
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lastName &&
                          touched.lastName
                          ? "input-error form-control"
                          : "form-control"
                      }
                    >
                    </Field>
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className="error"
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email &&
                          touched.email
                          ? "input-error form-control"
                          : "form-control"
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error"
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="email">Password</label>
                    <Field
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password &&
                          touched.password
                          ? "input-error form-control"
                          : "form-control"
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error"
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="email">Confirm Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmpassword &&
                          touched.confirmpassword
                          ? "input-error form-control"
                          : "form-control"
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      onClick={() => handleSubmit}
                      type="submit"
                      className={
                        dirty && isValid
                          ? "btn login-btn"
                          : "login-btn disabled-btn"
                      }
                      disabled={!(dirty && isValid)}
                      style={{ flexBasis: "35%" }}
                    >
                      Sign up
                    </button>

                  </div>
                </Form>
              )
            }
          }
        </Formik>
      </div>
    </div>
  )
}

export default Signup