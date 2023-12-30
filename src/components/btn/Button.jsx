import React from 'react'

const Button = ({ label,  className}) => {
  return (
    <div>
         
    <button
    type="submit"
    className={`bg-quaternary  text-white font-serif text-sm py-1 px-2 rounded ${className}`}
    >
    {label}
  </button>
   
  
   
</div>
  )
}

export default Button
