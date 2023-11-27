import React from 'react'

const ConfirmationModal = ({ show, setShow, handleChangeQuantity, data }) => {

    const handleOperation = async () => {
        handleChangeQuantity(data);
    }

    return (
        <>
            {show && (
                <>
                    <div onClick={() => setShow(false)} className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className={`inset-0 ${show ? "bg-gray-500 fixed" : "bg-transparent"} bg-opacity-75`} />
                        <div className="fixed inset-0  w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative z-20 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 " onClick={(e) => { e.stopPropagation() }}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative">
                                        <div className="sm:flex sm:items-start">
                                            <div className="flex mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="flex items-center gap-2 text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                                                    Medicine Taken?
                                                    <div className='cursor-pointer flex justify-center items-center border-black w-5 h-5 border-2 rounded-full'>
                                                        <i onClick={() => setShow(false)} className="fa-solid fa-xmark"></i>
                                                    </div>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-blue-700 h-[2px]'></div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 ">
                                        <button type="button" onClick={handleOperation} className={`block bg-blue-800 hover:bg-blue-700 w-full rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm`}>
                                            Yes
                                        </button>
                                        <button type="button" onClick={() => setShow(false)} className={`block mt-3 w-full justify-center  rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blue-800 hover-bg-gray-50`}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ConfirmationModal;