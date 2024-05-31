import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import './components/navbar/navbar.scss'
import Home from './components/Home';
import './components/home.scss'
import './admin/admin.scss'
import './admin/booksadmin.scss'
import './admin/navadmin.scss'
import './components/auth/auth.scss'
import './components/books.scss'

import Lenis from "@studio-freight/lenis";
import { useEffect } from 'react';
import About from './components/About';
import Books from './components/Books';
import Contact from './components/Contact';
import Shops from './components/Shops';
import Services from './components/Services';
import RegistrationForm from './components/auth/Register';
import LoginForm from './components/auth/Login';
import AdminComponent from './admin/AdminComponent';
import BooksOrder from './components/BooksOrder';


function App() {

  useEffect(() => {
      const lenis = new Lenis({
          direction: "vertical", // vertical, horizontal
          gestureDirection: "vertical", // vertical, horizontal, both
          smooth: true,
          mouseMultiplier: 1.0, // sensibility
          smoothTouch: true, // Mobile
          touchMultiplier: 2, // sensibility on mobile
      })

      
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      
      requestAnimationFrame(raf)

  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/admin' element={<AdminComponent/>} ></Route>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/about' element={<About/>} ></Route>
          <Route path='/book/:shopId' element={<Books/>}></Route>
          <Route path='/carts' element={<BooksOrder/>}></Route>
          <Route path='/service' element={<Services/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/shops' element={<Shops/>}></Route>
          <Route path='/register' element={<RegistrationForm/>} ></Route>
          <Route path='/login' element={<LoginForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
