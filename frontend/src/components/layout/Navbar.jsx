import React,{useState} from 'react';
import {HiOutlineMenu,HiOutlineX} from 'react-icons/hi';
import SideMenu from './SideMenu';


const Navbar = ({activeMenu}) => {
    const [openSideMenu,setOpenSideMenu]=useState(false);
  return (
    <div className='flex gap-5 bg-black border-b border-white backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      <button className='block lg:hidden text-white' onClick={()=>{setOpenSideMenu(!openSideMenu)}}>{openSideMenu?(<HiOutlineX className='text-2xl'/>):(<HiOutlineMenu className='text-2xl'/>)}</button>
       <h2 className='text-lg font-medium text-primary'>Track Pocket</h2>

       {openSideMenu && (<div className='fixed top-[61px] -ml-4 bg-white'>
         <SideMenu activeMenu={activeMenu} />
       </div>)}
    </div>
  )
}

export default Navbar;