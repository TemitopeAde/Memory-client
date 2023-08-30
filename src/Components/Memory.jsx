import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import "./component.css";
import image from './img.png';
import { deletePost, getMemories, likePost, logout, resetStatus, searchMemories } from '../state/actions';
import Loader from './Loader';
import Search from './Search';
import { PaginationItem } from '@mui/material';
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FormModal from './FormModal';


const Memory = () => {
  const memories = useSelector((state) => state.memory.allMemories);
  const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector((state) => state.loader.loading);
  const numberOfPages = useSelector((state) => state.memory.numberOfPage);
  const currentPage = useSelector((state) => state.memory.currentPage);
  const token = useSelector((state) => state.auth.token);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const pageNumber = query.get('page') || 1;


  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getMemories(pageNumber));
  }, [pageNumber])

  useEffect(() => {
    if (token) {
      const decodedJwt = jwt_decode(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logout())
      }
    }

    dispatch(resetStatus())
  }, [location])

  const [currentId, setCurrentId] = useState(null);

  const handleEdit = (id) => {
    setCurrentId(id);
  }

  useEffect(() => {

  }, [currentId])


  console.log(memories);

  const handleDelete = (id) => {
    dispatch(deletePost(id))
    dispatch(getMemories(pageNumber));
  }

  // console.log(loading);

  if (loading) return <Loader />
  return (
    <>
      <h2 className='memories-title'>My Memories</h2>
      <Search />
      <div className='card-grid'>
        {memories.length > 1 ? memories.map((res, index) => {

          return (
            <div key={index} className='card-memories'>
              <div className='img-overlay'>
                <img  src={image} alt="" />

                <div className="overlay">
                  <div className="overlay-div">
                    <div className='over edit'>
                      <button onClick={() => handleEdit(res._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                          <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="over like">
                      <button onClick={() => handleDelete(res._id)}>
                        <img width="25" height="25" src="https://img.icons8.com/color/48/delete-forever.png" alt="delete-forever" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Link className='title' to={`/post/${res._id}`}>{res.title}</Link>
                <p style={{ textTransform: "capitalize" }}>{res.message}</p>
              </div>

              

            </div>

          )
        }) : <h2>No memory was found</h2>}





      </div>
      <Stack spacing={4}>
        <Pagination onChange={() => console.log("change")} page={Number(currentPage) || 1} count={numberOfPages} variant="outlined" renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/?page=${item.page}`} />
        )} />
      </Stack>

      {currentId && <FormModal currentId={currentId} setCurrentId={setCurrentId} />}

    </>
  )
}

export default Memory;