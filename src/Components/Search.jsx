import React from 'react'
import { searchMemories } from '../state/actions';
import { useDispatch,  } from 'react-redux';
import { Formik, Form, Field } from "formik";
import { getMemories } from '../state/actions';


const Search = () => {
  const dispatch = useDispatch();
  
  const submitForm = (values) => {
    const { params, tags } = values;
    
    if (params && tags) {
      dispatch(searchMemories(values))
    } else {
      
    }

    // dispatch(searchMemories(values))
  };

  const initialValues = {
    params: "",
    tags: ""
  };

  const validate = (values) => {
    let errors = {};

    if (!values.params) {
      errors.params = "Enter a search parameter";
    }

    if (!values.tags) {
      errors.tags = "Enter a tag";
    }

    return errors;
  };
  return (
    <div>
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
                  <div className='search-div'>
                    <div className='form-groups'>
                      <Field
                        type="text"
                        placeholder="Enter search parameter"
                        name="params"
                        value={values.params}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.params &&
                            touched.params
                            ? "input-error form-control round-input"
                            : "form-control round-input"
                        }
                      />
                      
                    </div>
                    <div className='form-groups'>
                      <Field
                        type="text"
                        name="tags"
                        placeholder="Enter tag"
                        value={values.tags}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.tags &&
                            touched.tags
                            ? "input-error form-control round-input"
                            : "form-control round-input"
                        }
                      />

                    </div>
                    <div className="form-groups">
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
                        Search
                      </button>

                    </div>
                    <div className="form-groups">
                      <button
                        onClick={() => dispatch(getMemories())}
                      >
                        Refresh
                      </button>

                    </div>
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

export default Search