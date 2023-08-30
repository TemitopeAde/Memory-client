import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleMemories } from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import img from '../Components/img.png';
import Header from '../Components/Header';

const SingleMemory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const memory = useSelector((state) => state.memory.memories);
  console.log(memory);
  console.log(id);

  useEffect(() => {
    dispatch(getSingleMemories(id))
  }, [])

  return (
    <>
      <Header />
      <div className="containers">
        <div className='meta'>
          <h3>{memory.title}</h3>
          <h4>{memory.name}</h4>
        </div>
        <img className='memory-img' src={img} alt="" />
        <p>{memory.message}</p>
      </div>
    </>
    
  )
}

export default SingleMemory