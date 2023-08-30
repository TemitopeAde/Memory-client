import React from 'react'
import { Audio, ColorRing } from 'react-loader-spinner'
 

const Loader = () => {
  return (
    <div>
      <ColorRing
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        
      />
    </div>
  )
}

export default Loader