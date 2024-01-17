import React from 'react'

const CenterHeroSectionFrame = ({ children }) => {
  return (
    <div className='flex items-center justify-center h-screen relative w-full overflow-hidden font-sans bg-gradient-to-br from-gray-900 via-purple-800 to-red-500 animate-gradientBG'>
      <div className="z-2 text-center w-2/4 mx-auto p-8 bg-opacity-80 bg-black rounded-lg shadow-lg backdrop-blur-md text-white">
        {children}
      </div>
    </div>
  )
}

export default CenterHeroSectionFrame;
