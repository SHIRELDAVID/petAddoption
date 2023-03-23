import React from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import "./Modal.css"

function Modal({ Comp, isOpen, setIsOpen, options }) {

    const handleWrapperClick = (event) => {
        if (event.target === event.currentTarget) setIsOpen(false)
    }
    if (isOpen) return createPortal(<div className="modal__wrapper" onClick={(e) => handleWrapperClick(e)}>
        {Comp && <Comp isOpen={isOpen} setIsOpen={setIsOpen} options={options ?? {}} />}
    </div >, document.getElementById("modal"))

}

export default Modal