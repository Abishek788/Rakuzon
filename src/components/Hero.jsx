
import React from 'react';

const Hero = () => {
  return (
    // <div className="relative top-20 left-0 w-screen h-screen pt-0 overflow-hidden">
    <div className='w-full '>

      <video
        loop
        autoPlay
        muted
        playsInline
        className="w-full h-200% object-cover"
      >
        <source src="/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Hero;
