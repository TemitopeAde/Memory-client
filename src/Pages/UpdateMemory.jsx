import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { createMemory, updateMemory } from '../state/actions';
import Loader from '../Components/Loader'; 
import { Navigate } from 'react-router-dom';



const UpdateMemory = ({ currentId }) => {
  const [postData, setPostData] = useState({})
  const loading = useSelector((state) => state.loader.loading);
  const post = useSelector((state) => currentId ? state.memory.allMemories.find((p) => p._id === currentId) : null)

  console.log(post, "post");
  // console.log(postData, "postdata");

  const initialValues = {
    title: post?.title,
    message: post?.message,
    name: post?.name,
  };

  // const initialValues = {
  //   title: "",
  //   message: "",
  //   name: "",
  // };


  useEffect(() => {
    if (post) setPostData(post)
  }, [post])


  const dispatch = useDispatch();
  const updatedPost = useSelector((state) => state.memory.updatedPost);

  

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
      dispatch(updateMemory(values, currentId))
    } else {
      dispatch(createMemory(values))
    }
  };

  if (loading) return <Loader />

  console.log(updatedPost, loading);

  // if (updatedPost || !loading) return <Navigate to="/" />

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

export default UpdateMemory