import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { createMemory, updateMemory } from '../state/actions';
import Loader from '../Components/Loader';

const EditMemory = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({})
  const loading = useSelector((state) => state.loader.loading);
  const post = useSelector((state) => currentId ? state.memory.allMemories.find((p) => p._id === currentId) : null)

  const initialValues = {
    title: post.title,
    message: post.message,
    name: post.name,
  };

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])
  

  const dispatch = useDispatch();
  const addStatus = useSelector((state) => state.memory.addMemory);

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

    if (currentId) {
      dispatch(updateMemory(values ,currentId))
      // console.log(values, "update");
    } else {
      dispatch(createMemory(values))
      // console.log(values, "new form");
    }
  };

  if (loading) return <Loader />

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
                    type="text"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.message &&
                        touched.message
                        ? "input-error form-control"
                        : "form-control"
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
                    {post ? "Edit memory" : "Create now"}
                    
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

export default EditMemory;