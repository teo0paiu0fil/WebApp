import React from 'react'
import './navbar.css'

function Navbar() {
  return (
    <div className='nav-container'>
        <a className='nav nav-element' href='#home'>Home</a>
        <a className='nav nav-element' href='#about'>About</a>
        <a className='nav nav-element' href='#contact'>Contact</a>
    </div>
  )
}

export default Navbar