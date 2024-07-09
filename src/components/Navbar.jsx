import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-blue-900 text-white px-8 justify-between py-5'>
        <div className=' md:text-3xl font-bold text-lg'>
            <span>Todo</span>
            
        </div>
        <ul className=' md:text-lg text-sm flex gap-4 hover:font-bold ' >
            <li className=' cursor-pointer'>home</li>
            <li className=' cursor-pointer'>contact</li>
        </ul>
    </nav>
  )
}

export default Navbar
