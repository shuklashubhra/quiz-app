import React from 'react';

export const Loader = () => {
  return (
    <div style={{width:"100%", height:"100vh", display:'flex', justifyContent:"center", alignItems:'center'}}>
      <p style={{fontSize:"32px"}}>Loading...</p>
    </div>
  )
}

export default Loader;