import usFlag from '@assets/images/us.png';
import faFlag from '@assets/images/fa.png';
import {useEffect, useRef, useState} from "react";
import {useAppContext} from "../contexts/app-context.jsx";

const ChangeLanguage = () => {
    const [show, setShow] = useState(false);
    const ref = useRef();
    const {language, changeLanguage} = useAppContext();
    useEffect(() => {
        const checkIfClickOutside = e => {
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickOutside);
        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside);
        }
    }, [show])
    useEffect(() => {
        setShow(false)
    }, [language]);
    return (
        <div className='dropdown'>
            <a className='nav-flag dropdown-toggle' onClick={() => setShow(true)}>
                <img src={language === 'fa' ? faFlag : usFlag} alt='English'/>
            </a>
            <div className={`dropdown-menu dropdown-menu-end ${show ? 'show' : undefined}`}
                 style={{textAlign: language === 'fa' ? 'right' : 'left'}}
                 ref={ref}>
                <a className='dropdown-item fw-bolder d-flex align-items-center gap-2' onClick={() => changeLanguage('fa')}>
                    <img src={faFlag} width='20px' className='ms-2' alt='Persian'/>
                    <span className='align-middle'>فارسی</span>
                </a>
                <a className='dropdown-item fw-bolder d-flex align-items-center gap-2' onClick={() => changeLanguage('en')}>
                    <img src={usFlag} width='20px' className='ms-2' alt='English'/>
                    <span className='align-middle'>English</span>
                </a>
            </div>
        </div>
    )
}
export default ChangeLanguage;