import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createMemory, getMemories } from '../state/actions/index';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [title, setTitle] = useState("");
  const [memory, setMemory] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const statusText = useSelector((res) => res.memory.statusText);

  const handleFormSubmit = async (e) => {
 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', memory);
    formData.append('image', image);
    dispatch(createMemory(formData));
    const notify = () => toast("Memories added successfully");
    dispatch(getMemories());

    setTitle("")
    setMemory("")
    // setImage("")
    notify()
  };

  if (statusText === "Created") {
    navigate("/")
  }

  return (
    <div className='add-memory'>
      <ToastContainer />
      <h1>Add a new Memory</h1>
      <form style={{ display: "grid", gap: "15px" }} onSubmit={handleSubmit(handleFormSubmit)} >
        <div>
          <label htmlFor="">Title</label>
          <input
            {...register("title", { required: true })}
            className='form-control'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          {errors.title?.type === "required" && (
            <p role="alert">Title is required</p>
          )}
        </div>

        <div>
          <label htmlFor="">Memories</label>
          <textarea value={memory} {...register("message", { required: true })} onChange={(e) => setMemory(e.target.value)} className='form-control'>

          </textarea>
          {errors.message?.type === "required" && (
            <p role="alert">Memories is required</p>
          )}
        </div>

        <div>
          <input
            {...register("image", { required: true })}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {errors.image?.type === "required" && (
            <p role="alert">Image is required</p>
          )}
        </div>

        <div className='add-btn'>
          <button type="submit">Submit</button>
        </div>

        
      </form>
    </div>
  );
}

export default App;
