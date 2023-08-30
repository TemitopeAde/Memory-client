import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AnimatePresence } from "framer-motion";
import Memories from './Pages/Memories';
import SingleMemory from './Pages/SingleMemory';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import AddMemoryForm from './Components/AddMemoryForm';




function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route exact path="/" element={<Memories />} />
        <Route path="/memories" element={<SingleMemory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/post/:id" element={<SingleMemory />} />
        <Route path="/add-memory" element={<AddMemoryForm />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
