import React, { useState } from 'react'
import { searchMemories } from '../state/actions';
import { useDispatch,  } from 'react-redux';
import { Formik, Form, Field } from "formik";
import { useForm } from "react-hook-form";
import cancel from '../static/image/cancel.png';

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitForm = (values) => {
    dispatch(searchMemories(values))
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div style={{ position: "relative"}}>
          <input 
            {...register("title", { required: true })} 
            type="text" 
            onChange={(e) => setSearchTerm(e.target.value)}
            className='form-control round-input' 
            placeholder='Search memories' 
            value={searchTerm}
            style={{ width: "30rem", marginBottom: "1rem"}}
          />

          <div style={{ position: "absolute", left: "29rem", top: "8px"}}>
            <button
               type='button' 
               onClick={() => setSearchTerm("")}
               style={{ cursor: "pointer", background: "none", outline: "none", border: "none"}}
              >
              <img src={cancel} alt="" style={{ width: "12px" }} />
            </button>
          </div>
        </div>
        <button style={{ width: "250px"}} className="btn login-btn" type="submit">Search</button>
      </form>
    </div>
  )
}

export default Search