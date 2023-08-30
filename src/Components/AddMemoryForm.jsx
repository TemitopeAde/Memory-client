import React from 'react'
import AddMemory from './AddMemory';
import Header from './Header';

const AddMemoryForm = () => {

  return (
    <>
      <Header />
      <div className='center-div'>
        <div className='modal-class'>
          
          <AddMemory />
        </div>
      </div>

    </>
    
  )
}

export default AddMemoryForm