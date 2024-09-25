import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/shopcontext';

const Navbar = ({signOut}) => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch} = useContext(ShopContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
           <Link to="/"> <img
  src="/logo.png"
  alt="Company Logo"
  className="w-36"
/></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/About" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/Contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
               <img onClick={() => setShowSearch(true) } src={assets.search_icon} className='w-5 cursor-pointer' alt='Search Icon' />

                <div className='group relative'>
                    <img className='w-5 cursor-pointer' src={assets.profile_icon} alt='Profile Icon' />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p onClick={signOut} className='cursor-pointer hover:text-black'>Logout</p>
                            {/* <p className='cursor-pointer hover:text-black'>Orders</p> */}

                        </div>
                    </div>
                </div>

                <Link to='/Cart1' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart Icon' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white  text-[8px]'></p>
                </Link>
                 {/* Sign Out Button (You can place it in Navbar or wherever needed) */}
      {/* <button onClick={signOut} style={{ marginTop: '20px' }}>
        Sign Out
      </button> */}

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='Menu Icon' />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Dropdown Icon' />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/About' className='py-2 pl-6 border'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/Contact' className='py-2 pl-6 border'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
