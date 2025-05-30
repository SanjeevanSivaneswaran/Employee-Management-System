import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark justify-content-center'>
            <a 
              className="navbar-brand" 
              href='#'
              style={{
                fontSize: '2rem',
                color: 'white',
                fontWeight: 'bold'
              }} 
            >
              Employee Management System
            </a>   
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
