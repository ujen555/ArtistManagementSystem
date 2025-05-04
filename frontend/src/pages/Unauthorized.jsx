import React from 'react'
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className="page-wrap">
        <div className="page-not-found">
            <h1 className="text-xl">
                <span>4</span>
                <span>0</span>
                <span className="broken">3</span>
            </h1>
            <h4 className="text-md">Access Denied !</h4>
            <h4 className="text-sm text-sm-btm">You don’t have access to this area of application. Speak to your administrator to unblock this feature. You can go back to <Link to='/'>previous page</Link></h4>
        </div>
    </div>
  )
}

export default Unauthorized
