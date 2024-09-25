import React from 'react'
import { Link} from 'react-router-dom';

function Coll() {
  return (
    <Link to="/collection"> <div className='w-full '>


    </div>
     <img
    src="/1.avif"
    alt="football"
    className="mt-20 w-full h-auto object-cover" 
    
  /></Link>
  )
}

export default Coll