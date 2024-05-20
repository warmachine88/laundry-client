import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const { account,setAccount } = useAuth()

    const [showLinks, setShowLinks] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleShowProfile = () => {
        setShowProfile(!showProfile)
        setShowLinks(false)
    }

    const handleShowLinks = () => {
        setShowLinks(!showLinks)
        setShowProfile(false)
    }

    const handleLogOut = () => {
        localStorage.removeItem('userToken')
        setAccount(null)
        navigate('/')
    }

    return (
        <div className='navbar-comp'>
            <nav>
                <div className="logo">
                    <img src="./img/lg-logo2.png" alt="" /> 
                    <h1 className='text-white text-3xl font-thin ml-2'>LaundryGrab</h1>
                </div>
                <div className={`links ${showLinks ? 'show' : ''}`}>
                    <li>
                        <Link to={'/'}> 
                            <h5> Home </h5>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/about'}> 
                            <h5> About Us </h5>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/book'}> 
                            <h5> Book </h5>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/contact'}> 
                            <h5> Contact </h5>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/shops'}> 
                            <h5> Laundry Shops </h5>
                        </Link>
                    </li>
                </div>
                <ul>
                    <div className="hamburger" onClick={() => handleShowLinks()}>
                        <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 23.9998V27.3332H5V23.9998H25ZM30 12.3332V15.6665H0V12.3332H30ZM25 0.666504V3.99984H5V0.666504H25Z" fill="white"/>
                        </svg>
                    </div>
                    <div className="profile flex items-center justify-center gap-2">
                        <h4> { account?.email && account?.type == 'client'  ? account.firstname : '' }  </h4>
                        <svg onClick={() => handleShowProfile()} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 6.38477C7.82467 6.38477 8.531 6.09077 9.119 5.50277C9.707 4.91477 10.0007 4.20877 10 3.38477C10 2.55943 9.70633 1.85277 9.119 1.26477C8.53167 0.678099 7.82533 0.384766 7 0.384766C6.17467 0.384766 5.46833 0.678099 4.881 1.26477C4.29367 1.85277 4 2.55943 4 3.38477C4 4.20943 4.29367 4.91543 4.881 5.50277C5.46833 6.0901 6.17467 6.3841 7 6.38477ZM14 13.6148L14 11.9698C14 11.5571 13.88 11.1711 13.64 10.8118C13.3993 10.4518 13.076 10.1724 12.67 9.97377C11.726 9.5211 10.7817 9.18177 9.837 8.95577C8.89167 8.7291 7.946 8.61577 7 8.61577C6.05333 8.61577 5.10767 8.7291 4.163 8.95577C3.21833 9.18243 2.27433 9.52177 1.331 9.97377C0.924333 10.1724 0.601 10.4518 0.361 10.8118C0.120333 11.1711 0 11.5571 0 11.9698L0 13.6158L14 13.6148ZM13 12.6148L1 12.6148V11.9688C1 11.7474 1.07133 11.5391 1.214 11.3438C1.35733 11.1491 1.55533 10.9844 1.808 10.8498C2.63067 10.4511 3.47933 10.1458 4.354 9.93377C5.22733 9.7211 6.10933 9.61477 7 9.61477C7.89 9.61477 8.772 9.7211 9.646 9.93377C10.5207 10.1458 11.3693 10.4511 12.192 10.8498C12.4453 10.9844 12.6433 11.1491 12.786 11.3438C12.9287 11.5391 13 11.7478 13 11.9698V12.6148ZM7 5.38477C6.45 5.38477 5.979 5.18877 5.587 4.79677C5.195 4.40477 4.99933 3.9341 5 3.38477C5 2.83477 5.19567 2.36377 5.587 1.97177C5.97833 1.57977 6.44933 1.3841 7 1.38477C7.55 1.38477 8.02067 1.58043 8.412 1.97177C8.80333 2.3631 8.99933 2.8341 9 3.38477C9 3.93477 8.804 4.40543 8.412 4.79677C8.02 5.1881 7.54933 5.3841 7 5.38477Z" fill="white"/>
                        </svg>

                        <div className={`drop-profile ${showProfile ? 'show' : ''}`}>
                            { account?.email && account?.type == 'client' ?
                            <>
                                <div className='drops-item' onClick={e => (  handleLogOut() )}>
                                    <h5> Logout </h5>
                                </div>
                                <Link to={'/carts'} className="drops-item">
                                    <h5> Carts </h5>
                                </Link>
                            </>
                            :       
                            <>
                                <Link to={'/register'} className="drops-item">
                                    <h5> Sign Up </h5>
                                </Link>
                                <Link to={'/login'} className="drops-item">
                                    <h5> Login </h5>
                                </Link>
                            </>                     
                            }
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar