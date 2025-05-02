import React from 'react'

function Loader({customStyles={}}) {
  return (
    <div className='loadingWrapper' style={customStyles}>
      <div className='loader'></div>
     </div>
  )
}

export default Loader
