import './Modal.css'

const Modal = ({open, onModalClose, children}) => {
    if (!open) return null;
    return (
        <main onClick={onModalClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'>
                <p className='closeBtn' onClick={onModalClose}>
                    X
                </p>
                <div className='content'>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Modal
