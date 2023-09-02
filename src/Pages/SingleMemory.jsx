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

  useEffect(() => {
    dispatch(getSingleMemories(id))
  }, [])

  return (
    <>
      <Header />
      <div className='memory-flex wrapper'>
        <div className="containers">
          <div className='meta'>
            <h1>{memory.title}</h1>
          </div>
          <img className='memory-img' src={memory?.image} alt="memory" />
          <p>{memory.message}</p>
        </div>

        <div>

        </div>
      </div>
      
    </>
    
  )
}

export default SingleMemory