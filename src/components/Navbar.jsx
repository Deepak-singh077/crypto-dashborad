import React, { useContext } from 'react'
import { MdArrowOutward } from "react-icons/md";
import { CoinContext } from '../context/CoinContext';
import {Link} from "react-router-dom"

const Navbar = () => {
  const{setCurrency}=useContext(CoinContext)

  const currencyHandler=(event)=>{
    switch(event.target.value){
      case"usd":{
        setCurrency({name:"usd",symbol:"$"});
        break;
      }
      case"eur":{
        setCurrency({name:"eur",symbol:"€"});
        break;
    }
    case"inr":{
      setCurrency({name:"inr",symbol:"₹"});
      break;
    }
    default:{
      setCurrency({name:"usd",symbol:"$"});
      break;
    }
  }
}
  return (
    <div className='Navabar flex items-center py-5 px-[10%] justify-between decoration-white ' style={{borderBottom:"3px solid #3c3c3c"}}>
      <Link to={`/`}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi3g7xpCFzc2tHHK4tzPaKS6mjiQ7UaXR5cQ&s" alt=""  className='w-[100px]'/>
          </Link>
        <ul className='flex gap-7'>
          <Link to={'/'}> <li>Home</li></Link> 
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right ">
      <select className='mr-2' onChange={currencyHandler}>
        <option value="usd" className=''>USD </option>
        <option value="eur">EUR </option>
        <option value="inr">INR </option>
      </select>
      <button className=' inline-flex items-center bg-white rounded-xl text-zinc-700 pl-3 '>Sign up <MdArrowOutward className='bg-black' /> </button> 
        </div>

    </div>
     
  )
}

export default Navbar;