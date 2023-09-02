import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { logout } from '../state/actions';
import Modal from 'react-modal';
// import Addmemories from '../Pages/Addmemories';
import FormModal from './FormModal';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  return (
    <header className="header-fixed wrapper">

      <div className="header-limiter">
        <h1>
          <Link to="/">Temitope<span>Memories</span></Link>
        </h1>
        {token ? <nav>
          <button onClick={() => {
            navigate("/add-memory")
          }} className='btn'>+Add Memory</button>
          <button onClick={() => dispatch(logout())} className='btn'>Logout</button>


        </nav> : <nav>
          <Link className='btn' to="/signin">Login</Link>
          <Link className='btn-2' to="/signup">Sign up</Link>
        </nav>}
      </div>

      <FormModal />

      {/* <div>
        <Modal
          isOpen={modalIsOpen}
          
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add memory modal"
        >

          <a onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
          </a>
          <Addmemories />
        </Modal>
      </div> */}
    </header>

  )
}

export default Header