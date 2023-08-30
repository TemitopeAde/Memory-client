import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Memory from '../Components/Memory'
import { getMemories, logout } from '../state/actions'
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

const Memories = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  
  // const decode = jwt_decode(token);
  // console.log(decode);

  

  return (
    <>
      <Header />
      <Memory />
    </>
  )
}

export default Memories