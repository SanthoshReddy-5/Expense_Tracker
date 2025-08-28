import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({children,isOpen,onClose,title}) => {
    if(!isOpen) return null;
    return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/80 bg-opacity-50'>
       <div className='relative p-4 w-full max-w-2xl max-h-full'>
         <div className='relative bg-black rounded-lg border border-white'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-white'>
               <h3 className='text-lg font-medium text-primary'>{title}</h3>

               <button type='button' className='text-white hover:text-primary border border-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer' onClick={onClose}>
                <AiOutlineClose/>
               </button>
            </div>

            <div className='p-4 md:p-5 space-y-4'>{children}</div>
         </div>
       </div>
    </div>
  )
}

export default Modal;