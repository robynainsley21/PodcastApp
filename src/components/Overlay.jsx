import { Fragment } from 'react'

const Overlay = ({ isOpen, onClose, children }, props) => {
    return (
        <Fragment key={props.id}>
            {...isOpen && (
            <div className='overlay' >
                <div className='overlay-background' onClick={onClose} />
                <div className='overlay-container'>
                    <div className='overlay-controls'>
                        <button 
                            className='overlay-close'
                            type='button'
                            onClick={onClose}
                        />
                    </div>
                    {children}
                </div>                
            </div>
          )}
        </Fragment>
          
        
      )
}

export default Overlay