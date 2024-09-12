import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Coin from './pages/Coin'
import Footer from './components/Footer'

function App() {
 

  return (
     <div className='app min-h-screen  linera'>
      <Navbar/>
    <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path='/coin/:coinId' element={<Coin/>} />
       
    </Routes>
    <Footer/>
     </div>
    
  )
}
export default App;