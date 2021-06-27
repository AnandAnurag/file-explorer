import './Modal.css';
import closeIcon from './close.svg'
import { unmountComponentAtNode } from 'react-dom';
import React, { createContext } from 'react';

export const ModalContext = createContext();
export function Modal({ title, children }) {
    const closeBtnRef = React.useRef();
    return (
        <div className="modal">
            <div className="modal-content">
                <div ref={closeBtnRef} className="modal-close" onClick={() => unmountComponentAtNode(document.getElementById('modal-root'))}>
                    <img src={closeIcon} alt="close"></img>
                </div>
                <div className="modal-title">
                    {title}
                </div>
                <div className="modal-body">
                    <ModalContext.Provider value={{ closeBtnRef }}>
                        {children}
                    </ModalContext.Provider>
                </div>
            </div>
        </div>
    );
}