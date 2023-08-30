import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navigate } from "react-router-dom";

import "./pages.css";
import { signin } from '../state/actions';

const Signin = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  const submitForm = (values) => {
    dispatch(signin(values));
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  if (token) return <Navigate to="/" />

  return (
    <div>
      <div className="container">
        <h2>Login Form</h2>

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
                      Log in
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

export default Signin