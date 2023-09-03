import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux';
import { createMemory, updateMemory } from '../state/actions';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateMemory = ({ currentId }) => {
  const [postData, setPostData] = useState({})
  const loading = useSelector((state) => state.loader.loading);
  const post = useSelector((state) => currentId ? state.memory?.allMemories?.data.find((p) => p._id === currentId) : null)
  const initialValues = {
    title: post.title,
    message: post.message,
    image: post.name,
  };
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [title, setTitle] = useState(initialValues.title);
  const [memory, setMemory] = useState(initialValues.message);
  const [image, setImage] = useState(initialValues.image);
  const statusText = useSelector((res) => res.memory.statusText);

  if (statusText === "Created") {
    console.log("yes")
    navigate("/")
  }

  
  useEffect(() => {
    if (post) setPostData(post)
  }, [post])


  const dispatch = useDispatch();
  const updatedPost = useSelector((state) => state.memory.updatedPost);


  const submitForm = async (e) => {
    try {
      if (currentId) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('message', memory);
        formData.append('image', image);
        const notify = () => toast("Memories updated successfully");
        notify();
        dispatch(updateMemory(formData, currentId))
      } else {
        dispatch(createMemory(FormData))
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />

  console.log(updatedPost, loading);

  // if (updatedPost || !loading) return <Navigate to="/" />

  return (
    <div className='add-memory'>
      <ToastContainer />
      <h1>Update Memory</h1>
      <form style={{ display: "grid", gap: "15px" }} onSubmit={handleSubmit(submitForm)} >
        <div>
          <label htmlFor="">Title</label>
          <input
            {...register("title", { required: false })}
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
          <textarea value={memory} {...register("message", { required: false })} onChange={(e) => setMemory(e.target.value)} className='form-control'>

          </textarea>
          {errors.message?.type === "required" && (
            <p role="alert">Memories is required</p>
          )}
        </div>

        <div>
          <input

            {...register("image", { required: false })}
            type="file"
            value={initialValues.image}
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

export default UpdateMemory