import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { createMemory } from '../state/actions';
import Loader from '../Components/Loader';
import { Navigate } from 'react-router-dom';


const AddMemory = () => {
  const loading = useSelector((state) => state.loader.loading);
  const status = useSelector((state) => state.memory.statusText);
  console.log(status);

  const initialValues = {
    title: "",
    message: "",
    name: "",
  };

  const dispatch = useDispatch();
  
  const validate = (values) => {
    let errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    } else if (values.title.length < 2) {
      errors.title = "Title is too short";
    }

    if (!values.message) {
      errors.message = "Message is required"
    }

    if (!values.name) {
      errors.name = "Name is required"
    }



    return errors;
  };

  const submitForm = (values) => {
    console.log(values);
    dispatch(createMemory(values))
  }

  if (loading) return <Loader />

  if (status) return <Navigate to="/" />

  return (
    <div>
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
                  <label htmlFor="">Title</label>
                  <Field
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.title &&
                        touched.title
                        ? "input-error form-control"
                        : "form-control"
                    }
                  >

                  </Field>
                  <ErrorMessage
                    name="title"
                    component="span"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name &&
                        touched.name
                        ? "input-error form-control"
                        : "form-control"
                    }
                  >
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="error"
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor="email">Message</label>
                  <Field
                    as="textarea"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.message &&
                        touched.message
                        ? "input-error form-control textbox"
                        : "form-control textbox"
                    }
                  />
                  <ErrorMessage
                    name="message"
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
                    Create now

                  </button>

                </div>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default AddMemory