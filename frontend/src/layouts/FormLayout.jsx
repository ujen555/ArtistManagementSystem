import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

function FormLayout({children,formTitle=''}) {
    const navigate=useNavigate();
  return (
    <div className="componentPanel">
        <div className="componentPanel__header">
            <h2 className="componentPanel__header__title">
                {formTitle}
            </h2>
            <button className="cTable__pagination__btn cBtn cTable__pagination__btn--pageNav" onClick={()=>navigate(-1)} >
                <span>
                    <FaLongArrowAltLeft/>
                    Back
                </span>
            </button>
        </div>
        <div className="componentPanel__body">
            {children}
        </div>
    </div>
  )
}

export default FormLayout
