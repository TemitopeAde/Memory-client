import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addComments, getSingleMemories } from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import Header from '../Components/Header';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const SingleMemory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const memory = useSelector((state) => state.memory.memories);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const handleFormSubmit = async (e) => {
    const notify = () => toast("Comment added successfully");
    const comments = {
      comment: comment,
      id: id
    }
    dispatch(addComments(comments));
    setComment("")
    notify()
  };
  useEffect(() => {
    dispatch(getSingleMemories(id));
  }, [id, memory])
 
  const formattedTimestamp = moment(memory.createdAt).fromNow()
  console.log(formattedTimestamp);
  return (
    <>
      <ToastContainer />
      <Header />
      <div className='memory-flex wrapper'>
        <div className="containers">
          <div className='meta'>
            <h1>{memory.title}</h1>
            <h4>{formattedTimestamp}</h4>
          </div>
          <img className='memory-img' src={memory?.image} alt="memory" />
          <p>{memory.message}</p>
          <div style={{ marginTop: "4rem" }}>
            <h2>Add a Comment</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <textarea
                
                {...register("comment", { required: true })} 
                style={{ height: '10vh' }}
                className='form-control'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              >
              </textarea>
              {errors.comment?.type === "required" && (
                <p role="alert">Comment is required</p>
              )}
              <button style={{ borderRadius: "4px", marginTop: "1rem", marginBottom: "3rem" }} className='btn' type="submit">Add comment</button>
            </form>
            {memory.comments.map((comment, index) => {
              
              return (
                <div key={index}>
                  
                  <div class="comment-section">
                    <div class="comment">
                      <p>{comment}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>

        </div>
      </div>

    </>

  )
}

export default SingleMemory