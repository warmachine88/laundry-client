import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import Navbar from './navbar/Navbar'
import { useAuth } from '../context/AuthContext'
import { useBooks } from '../context/BooksContext'

const Home = () => {

    const ctx = useRef(gsap.context(() => {}))
    const imgRefs = useRef([])
    const textRefs = useRef([])

    const { account } = useAuth()
    const { booksStatus,setBooksStatus } = useBooks()

    const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false);

    const toggleServiceDropdown = () => {
        setServiceDropdownVisible(!serviceDropdownVisible);
    };

    useEffect(() => {
        const lenis = new Lenis({
            direction: "vertical", // vertical, horizontal
            gestureDirection: "vertical", // vertical, horizontal, both
            smooth: true,
            mouseMultiplier: 1.0, // sensibility
            smoothTouch: true, // Mobile
            touchMultiplier: 2, // sensibility on mobile
            infinite: false // Infinite scrolling
        })

        
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)
    },[])
    
    const handleMouseOver = (m,e) => {
        m.preventDefault()
        gsap.to(textRefs.current[e],{
            "--width":"80%",
            "--lt":"10%",
            duration:1.85,
            ease:'expo.inOut',
            overwrite:'auto'
        })
        gsap.to(imgRefs.current[e],{
            "--polygon-height":"100%",
            scale:1,
            duration:1.85,
            ease:'expo.inOut',
            overwrite:'auto'
        })
    }
    
    const handleMouseLeave = (m,e) => {
        m.preventDefault()
        gsap.to(textRefs.current[e],{
            "--width":"0%",
            "--lt":"50%",
            duration:1.85,
            overwrite:'auto',
            ease:'expo.inOut'
        })
        gsap.to(imgRefs.current[e],{
            scale:2,
            "--polygon-height":"0%",
            duration:1.85,
            overwrite:'auto',
            ease:'expo.inOut',
        })
    }
    
    

    const { handleSubmitBooks,bookingInfo, setBookingInfo} = useBooks()
    
    useEffect(() => {
        // Check if account has necessary fields before updating bookingInfo
        if (account?.firstname || account?.email || account?.contact_no) {
            setBookingInfo((prevBookingInfo) => ({
                ...prevBookingInfo,
                user_id: prevBookingInfo.user_id + account?.email,
                firstname: account?.firstname,
                lastname: account?.lastname,
                email: account?.email,
                contact_no: account?.contact_no,
            }));
        }
    }, [account]);


    const handleInputChange = (e) => {
        setBookingInfo({
            ...bookingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const [selectedItems, setSelectedItems] = useState({
        drying: false,
        washing: false,
        ironing: false,
        cleaning: false,
    });

    const handleItemClick = (itemName) => {
        setBookingInfo((prevState) => {
            const updatedService = {
                ...prevState.service,
                [itemName]: !prevState.service[itemName]
            };
    
            return {
                ...prevState,
                service: updatedService
            };
        });
    
        setSelectedItems((prevState) => ({
        ...prevState,
        [itemName]: !prevState[itemName],
        }));
    };

    return (
        <>
            <Navbar/>
            <div className='main-component'>
                <section>
                    <div className="banner">
                        <img src="./img/laundry222.jpg" alt="" />
                        <div className="left-shadow"></div>
                        <div className="container-banner">
                            <div className="container-comp flex items-center justify-center flex-col">
                                
                                <h1>
                                    Pampering Your CLOTHES <br/> 
                                    with PRECISION, <br/>
                                    Exceeding Your Laundry SERVICE Expectations
                                </h1>
                                <div className="underlines">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                </div>
                                <div className="book-cd flex items-center justify-start">
                                    <button className='transition-all ease-in-out bg-white hover:bg-blue-400 text-black hover:text-white font-bold py-4 px-16 rounded'>
                                        Book Now!
                                    </button>
                                    { account?.email && account?.type == 'client' ? 
                                    <></>
                                    : 
                                    <button className='transition-all ease-in-out bg-sky-200 hover:bg-sky-300 text-black hover:text-white font-bold py-4 px-11 rounded'>
                                            <Link to={'/register'}>
                                                Create an account
                                            </Link>
                                    </button>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="open-down">
                            <div className="mouse-down">
                                <div className="line"></div>
                            </div>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6 5.29289L10.6464 0.646447C10.8417 0.451184 11.1583 0.451184 11.3536 0.646447C11.5488 0.841709 11.5488 1.15829 11.3536 1.35355L6.35355 6.35355C6.15829 6.54882 5.84171 6.54882 5.64645 6.35355L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" fill="#fff"/>
                            </svg>
                        </div>

                    </div>
                </section>

                <section className="bg-blue-500 py-16">
                    <div className="container mx-auto text-white">
                        <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="p-4 rounded-lg bg-white text-blue-500">
                                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Laundry Dry & Clean</h3>
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-white text-blue-500">
                                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2 5a5 5 0 0110 0 5 5 0 01-10 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21a5 5 0 01-10 0 5 5 0 0110 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Laundry Wash & Fold</h3>
                                <p className="text-sm">
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-white text-blue-500">
                                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 20l4-16m2 16l4-16M6 9h14m-12 0a2 2 0 100-4 2 2 0 000 4z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Laundry Iron and Wash</h3>
                                <p className="text-sm">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="about-us">
                        <div className="line-gap"></div>
                        <div className="title">
                            <h1> What about us? </h1>
                        </div>
                        <div className="about-section">
                            <div className="random-bg">
                                <div className="cl cl1"></div>
                                <div className="cl cl2"></div>
                                <div className="cl cl3"></div>
                                <div className="cl cl4"></div>
                            </div>

                            <div className="grid about-items">
                                <div className="items" 
                                    onMouseEnter={e => handleMouseOver(e, 0)}
                                    onMouseOut={e => handleMouseLeave(e, 0)}
                                >
                                    <div className="items-img">
                                        <img ref={ e => imgRefs.current.push(e) } src="./img/laundry.jpg" alt="" />
                                    </div>
                                    <div className="it">
                                        <div className="tx1">
                                            <h3 ref={ e=> textRefs.current.push(e) }> 1 </h3>
                                        </div>
                                        <div className="tx2">
                                            <h2> Smooth Delivery </h2>
                                        </div>
                                        <div className="tx3">
                                            <h5> Fast delivery after clean </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="items" 
                                    onMouseEnter={e => handleMouseOver(e, 1)}
                                    onMouseOut={e => handleMouseLeave(e, 1)}
                                >
                                    <div className="items-img">
                                        <img ref={ e => imgRefs.current.push(e) } src="./img/laundry2.jpg" alt="" />
                                    </div>
                                    <div className="it">    
                                        <div className="tx1">
                                            <h3 ref={ e=> textRefs.current.push(e) }> 2 </h3>
                                        </div>
                                        <div className="tx2">
                                            <h2> Easy to track </h2>
                                        </div>
                                        <div className="tx3">
                                            <h5> Understable cleaning operation </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="items" 
                                    onMouseEnter={e => handleMouseOver(e, 2)}
                                    onMouseOut={e => handleMouseLeave(e, 2)}
                                >
                                    <div className="items-img">
                                        <img ref={ e => imgRefs.current.push(e) } src="./img/laundry3.jpg" alt="" />
                                    </div>
                                    <div className="it">
                                        <div className="tx1">
                                            <h3 ref={ e=> textRefs.current.push(e) }> 3 </h3>
                                        </div>
                                        <div className="tx2">
                                            <h2> Smooth Transaction </h2>
                                        </div>
                                        <div className="tx3">
                                            <h5> No hustle transaction payments </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* <section>
                    <div className="book-section">
                        <div className="line"></div>
                        {
                            booksStatus ? 
                            <div className="books-order-release">
                                <h4> Books Status Release ✔️ </h4>
                                <div className="close-area">
                                    <svg onClick={e  => setBooksStatus('')} width="31" height="23" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.7185 22.4375H11.1248C10.8347 22.4374 10.5566 22.3222 10.3515 22.117L0.507735 12.2733C0.302689 12.0682 0.1875 11.79 0.1875 11.5C0.1875 11.21 0.302689 10.9318 0.507735 10.7267L10.3515 0.882969C10.5566 0.677837 10.8347 0.562562 11.1248 0.5625H29.7185C30.0086 0.5625 30.2868 0.677734 30.4919 0.882852C30.697 1.08797 30.8123 1.36617 30.8123 1.65625V21.3438C30.8123 21.6338 30.697 21.912 30.4919 22.1171C30.2868 22.3223 30.0086 22.4375 29.7185 22.4375ZM11.5776 20.25H28.6248V2.75H11.5776L2.82758 11.5L11.5776 20.25Z" fill="black"/>
                                        <path d="M20.3278 11.5L25.3438 6.48406L23.7972 4.9375L18.7812 9.95344L13.7653 4.9375L12.2188 6.48406L17.2347 11.5L12.2188 16.5159L13.7653 18.0625L18.7812 13.0466L23.7972 18.0625L25.3438 16.5159L20.3278 11.5Z" fill="black"/>
                                    </svg>
                                </div>

                            </div>  : <></>
                        }
                        <div className="md:w-full p-4 title">
                            <h2 className="text-2xl font-bold mb-4"> Bookings </h2>
                        </div>
                        <div className="flex-bookings md:py-20 py-2 flex items-center justify-evenly flex-wrap">
                            <div className="item-select">
                                <div className="item-book">
                                    2.5$ / KG
                                    <svg width="78" height="86" viewBox="0 0 78 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.8337 79.2083C21.6392 78.1667 14.7295 74.5556 9.10449 68.375C3.47949 62.1944 0.666992 54.9028 0.666992 46.5C0.666992 41.9167 1.51699 37.6639 3.21699 33.7417C4.91699 29.8194 7.33088 26.3639 10.4587 23.375L34.0003 0.25L57.542 23.375C60.042 25.875 62.1087 28.6875 63.742 31.8125C65.3753 34.9375 66.4684 38.3056 67.0212 41.9167H58.5837C58.0975 39.5556 57.2823 37.3167 56.1378 35.2C54.9934 33.0833 53.517 31.1556 51.7087 29.4167L34.0003 11.9167L16.292 29.4167C13.8614 31.7083 12.0378 34.2958 10.8212 37.1792C9.60449 40.0625 8.99755 43.1694 9.00033 46.5C9.00033 52.5417 10.9975 57.8542 14.992 62.4375C18.9864 67.0208 23.9337 69.7986 29.8337 70.7708V79.2083ZM39.417 59.3125L36.917 53.5833C38.7225 52.6111 40.6156 51.8125 42.5962 51.1875C44.5767 50.5625 46.5725 50.25 48.5837 50.25C50.1809 50.25 51.76 50.4417 53.3212 50.825C54.8823 51.2083 56.3934 51.6764 57.8545 52.2292C59.1045 52.7847 60.3725 53.2708 61.6587 53.6875C62.9448 54.1042 64.2809 54.3125 65.667 54.3125C67.2642 54.3125 68.8267 54.0347 70.3545 53.4792C71.8823 52.9236 73.3753 52.2639 74.8337 51.5L77.3337 57.2292C75.5281 58.2014 73.6364 59 71.6587 59.625C69.6809 60.25 67.6837 60.5625 65.667 60.5625C64.0698 60.5625 62.4906 60.3722 60.9295 59.9917C59.3684 59.6111 57.8573 59.1417 56.3962 58.5833C55.1462 58.0278 53.8781 57.5417 52.592 57.125C51.3059 56.7083 49.9698 56.5 48.5837 56.5C46.9864 56.5 45.4239 56.7778 43.8962 57.3333C42.3684 57.8889 40.8753 58.5486 39.417 59.3125ZM39.417 71.8125L36.917 66.0833C38.7225 65.1111 40.6156 64.3125 42.5962 63.6875C44.5767 63.0625 46.5725 62.75 48.5837 62.75C50.1809 62.75 51.76 62.9417 53.3212 63.325C54.8823 63.7083 56.3934 64.1764 57.8545 64.7292C59.1045 65.2847 60.3725 65.7708 61.6587 66.1875C62.9448 66.6042 64.2809 66.8125 65.667 66.8125C67.2642 66.8125 68.8267 66.5347 70.3545 65.9792C71.8823 65.4236 73.3753 64.7639 74.8337 64L77.3337 69.7292C75.5281 70.7014 73.6364 71.5 71.6587 72.125C69.6809 72.75 67.6837 73.0625 65.667 73.0625C64.0698 73.0625 62.4906 72.8708 60.9295 72.4875C59.3684 72.1042 57.8573 71.6361 56.3962 71.0833C55.1462 70.5278 53.8781 70.0417 52.592 69.625C51.3059 69.2083 49.9698 69 48.5837 69C46.9864 69 45.4239 69.2778 43.8962 69.8333C42.3684 70.3889 40.8753 71.0486 39.417 71.8125ZM39.417 84.3125L36.917 78.5833C38.7225 77.6111 40.6156 76.8125 42.5962 76.1875C44.5767 75.5625 46.5725 75.25 48.5837 75.25C50.1809 75.25 51.76 75.4417 53.3212 75.825C54.8823 76.2083 56.3934 76.6764 57.8545 77.2292C59.1045 77.7847 60.3725 78.2708 61.6587 78.6875C62.9448 79.1042 64.2809 79.3125 65.667 79.3125C67.2642 79.3125 68.8267 79.0347 70.3545 78.4792C71.8823 77.9236 73.3753 77.2639 74.8337 76.5L77.3337 82.2292C75.5281 83.2014 73.6364 84 71.6587 84.625C69.6809 85.25 67.6837 85.5625 65.667 85.5625C64.0698 85.5625 62.4906 85.3708 60.9295 84.9875C59.3684 84.6042 57.8573 84.1361 56.3962 83.5833C55.1462 83.0278 53.8781 82.5417 52.592 82.125C51.3059 81.7083 49.9698 81.5 48.5837 81.5C46.9864 81.5 45.4239 81.7778 43.8962 82.3333C42.3684 82.8889 40.8753 83.5486 39.417 84.3125Z" fill="#4D89E2"/>
                                    </svg>
                                </div>
                                <div className="choose-stick flex align-items justify-between w-full">
                                    <h5> Drying </h5>
                                    <div className="circ-check" onClick={() => handleItemClick('drying')}>
                                        {selectedItems.drying && 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M22.1516 7.30783L9.65158 19.8078C9.61531 19.8442 9.57222 19.873 9.5248 19.8926C9.47738 19.9123 9.42655 19.9224 9.37522 19.9224C9.32388 19.9224 9.27305 19.9123 9.22563 19.8926C9.17821 19.873 9.13513 19.8442 9.09885 19.8078L3.6301 14.3391C3.5568 14.2658 3.51562 14.1664 3.51562 14.0627C3.51563 13.9591 3.5568 13.8596 3.6301 13.7864C3.7034 13.7131 3.80281 13.6719 3.90647 13.6719C4.01012 13.6719 4.10954 13.7131 4.18283 13.7864L9.37522 18.9787L21.5989 6.7551C21.6721 6.6818 21.7716 6.64062 21.8752 6.64062C21.9789 6.64062 22.0783 6.6818 22.1516 6.7551C22.2249 6.8284 22.2661 6.92781 22.2661 7.03147C22.2661 7.13513 22.2249 7.23454 22.1516 7.30783Z" fill="black"/>
                                            </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="item-select">
                                <div className="item-book">
                                    1.5$ / KG
                                    <svg width="88" height="64" viewBox="0 0 88 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.9976 0.71725C3.16643 0.531684 4.26439 1.32878 4.44995 2.4976L12.5957 53.8055C12.5957 53.8056 12.5957 53.8054 12.5957 53.8055C12.8271 55.2603 13.5698 56.5854 14.6901 57.5418C15.8106 58.4983 17.2354 59.0239 18.7086 59.0241C18.7087 59.0241 18.7085 59.0241 18.7086 59.0241H69.2919C70.7657 59.0247 72.1922 58.4994 73.3134 57.5428C74.4345 56.5862 75.1776 55.261 75.409 53.8055L83.5505 2.49777C83.736 1.32893 84.8339 0.53175 86.0028 0.717223C87.1716 0.902697 87.9688 2.00059 87.7833 3.16943L79.6416 54.4778C79.2501 56.9409 77.9925 59.1842 76.0951 60.8031C74.198 62.4218 71.7857 63.3106 69.2919 63.3098C69.2916 63.3098 69.2922 63.3098 69.2919 63.3098H18.7086C16.2154 63.3095 13.8038 62.4201 11.9076 60.8014C10.0113 59.1826 8.75458 56.9406 8.36315 54.4784L0.21725 3.1696C0.0316839 2.00077 0.828776 0.902816 1.9976 0.71725Z" fill="#4D89E2"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M26.9923 14.0854L27.0079 14.1069L27.0737 14.1963C27.1341 14.2776 27.2269 14.401 27.3501 14.5606C27.5968 14.88 27.9646 15.3429 28.4376 15.9015C29.3864 17.0218 30.7452 18.5104 32.3874 19.9924C35.7689 23.0438 39.9402 25.6904 44.0003 25.6904C48.0603 25.6904 52.2317 23.0438 55.6131 19.9924C57.2554 18.5104 58.6141 17.0218 59.5629 15.9015C60.036 15.3429 60.4038 14.88 60.6504 14.5606C60.7737 14.401 60.8665 14.2776 60.9268 14.1963L60.9927 14.1069L61.0069 14.0873C61.007 14.0871 61.0086 14.0849 61.0088 14.0847C61.0085 14.085 61.0083 14.0854 62.7503 15.3333C64.4923 16.5812 64.492 16.5816 64.4916 16.5822L64.4807 16.5973L64.4559 16.6314L64.3678 16.7511C64.2922 16.8529 64.1831 16.998 64.0424 17.1802C63.7641 17.5405 63.3616 18.0469 62.8501 18.6515C62.8445 18.6581 62.8389 18.6647 62.8333 18.6713C61.7971 19.8948 60.3051 21.5312 58.4843 23.1742C54.9397 26.3728 49.736 29.9761 44.0003 29.9761C38.2645 29.9761 33.0608 26.3728 29.5162 23.1742C27.6955 21.5312 26.2035 19.8948 25.1672 18.6713C25.1616 18.6647 25.156 18.6581 25.1505 18.6515C25.1175 18.6866 25.0841 18.722 25.0504 18.7577C23.9082 19.9671 22.2904 21.5855 20.3948 23.2103C18.5062 24.8291 16.2972 26.4929 13.9717 27.7614C11.6699 29.0169 9.08953 29.9761 6.50028 29.9761C5.31681 29.9761 4.35742 29.0168 4.35742 27.8333C4.35742 26.6498 5.31681 25.6904 6.50028 25.6904C8.07769 25.6904 9.92436 25.0872 11.9195 23.999C13.8909 22.9237 15.8485 21.4625 17.6057 19.9563C19.356 18.4561 20.8632 16.9495 21.9346 15.8151C22.469 15.2493 22.8917 14.7795 23.1785 14.4539C23.3218 14.2912 23.431 14.1647 23.503 14.0806L23.5826 13.987L23.6008 13.9654L23.6041 13.9615C24.0288 13.4521 24.6658 13.1676 25.3286 13.1919C25.9911 13.2161 26.6059 13.5468 26.9923 14.0854ZM64.3965 13.9615L64.3998 13.9654L64.4179 13.987L64.4976 14.0806C64.5695 14.1647 64.6787 14.2912 64.8221 14.4539C65.1089 14.7795 65.5316 15.2493 66.066 15.8151C67.1373 16.9495 68.6446 18.4561 70.3948 19.9563C72.152 21.4625 74.1097 22.9237 76.0811 23.999C78.0762 25.0872 79.9229 25.6904 81.5003 25.6904C82.6838 25.6904 83.6431 26.6498 83.6431 27.8333C83.6431 29.0168 82.6838 29.9761 81.5003 29.9761C78.911 29.9761 76.3306 29.0169 74.0289 27.7614C71.7034 26.4929 69.4944 24.8291 67.6057 23.2103C65.7101 21.5855 64.0924 19.9671 62.9502 18.7577C62.9164 18.722 62.8831 18.6866 62.8501 18.6515M64.3965 13.9615C63.9718 13.4521 63.3347 13.1676 62.6719 13.1919C62.0093 13.2161 61.3952 13.5458 61.0088 14.0847" fill="#4D89E2"/>
                                    </svg>
                                </div>
                                <div className="choose-stick flex align-items justify-between w-full">
                                    <h5> Washing </h5>
                                    <div className="circ-check" onClick={() => handleItemClick('washing')}>
                                        {selectedItems.washing && 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M22.1516 7.30783L9.65158 19.8078C9.61531 19.8442 9.57222 19.873 9.5248 19.8926C9.47738 19.9123 9.42655 19.9224 9.37522 19.9224C9.32388 19.9224 9.27305 19.9123 9.22563 19.8926C9.17821 19.873 9.13513 19.8442 9.09885 19.8078L3.6301 14.3391C3.5568 14.2658 3.51562 14.1664 3.51562 14.0627C3.51563 13.9591 3.5568 13.8596 3.6301 13.7864C3.7034 13.7131 3.80281 13.6719 3.90647 13.6719C4.01012 13.6719 4.10954 13.7131 4.18283 13.7864L9.37522 18.9787L21.5989 6.7551C21.6721 6.6818 21.7716 6.64062 21.8752 6.64062C21.9789 6.64062 22.0783 6.6818 22.1516 6.7551C22.2249 6.8284 22.2661 6.92781 22.2661 7.03147C22.2661 7.13513 22.2249 7.23454 22.1516 7.30783Z" fill="black"/>
                                            </svg>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="item-select">
                                <div className="item-book">
                                    3.5$ / KG
                                    <svg width="76" height="42" viewBox="0 0 76 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 41.8337V33.1795C0.5 29.3906 1.87778 26.1462 4.63333 23.4462C7.39167 20.7462 10.7417 19.3962 14.6833 19.3962H52.0208V14.7503C52.0208 13.0364 51.4 11.5656 50.1583 10.3378C48.9139 9.11282 47.3722 8.50033 45.5333 8.50033H33.1917C31.3694 8.50033 29.8194 9.11282 28.5417 10.3378C27.2639 11.5656 26.625 13.0364 26.625 14.7503H22.4583C22.4583 11.8559 23.5 9.39755 25.5833 7.37532C27.675 5.34755 30.2125 4.33366 33.1958 4.33366H45.5375C48.5292 4.33366 51.0528 5.34755 53.1083 7.37532C55.1639 9.39755 56.1917 11.8559 56.1917 14.7503V31.2587H56.4333C58.2556 31.2587 59.8056 30.6448 61.0833 29.417C62.3639 28.192 63.0042 26.7225 63.0042 25.0087V10.5837C63.0042 7.68921 64.0319 5.23088 66.0875 3.20866C68.143 1.18088 70.6681 0.166992 73.6625 0.166992H75.5V4.33366H73.6583C71.8194 4.33366 70.2778 4.94616 69.0333 6.17116C67.7889 7.39894 67.1667 8.86977 67.1667 10.5837V25.0087C67.1667 27.9003 66.1222 30.3587 64.0333 32.3837C61.9444 34.4087 59.4097 35.4225 56.4292 35.4253H56.1875V41.8337H0.5ZM4.66667 37.667H52.0208V23.5628H14.6833C11.9278 23.5628 9.56944 24.5045 7.60833 26.3878C5.64722 28.2712 4.66667 30.535 4.66667 33.1795V37.667Z" fill="#4D89E2"/>
                                    </svg>
                                </div>
                                <div className="choose-stick flex align-items justify-between w-full">
                                    <h5> Ironing </h5>
                                    <div className="circ-check" onClick={() => handleItemClick('ironing')}>
                                        {selectedItems.ironing && 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M22.1516 7.30783L9.65158 19.8078C9.61531 19.8442 9.57222 19.873 9.5248 19.8926C9.47738 19.9123 9.42655 19.9224 9.37522 19.9224C9.32388 19.9224 9.27305 19.9123 9.22563 19.8926C9.17821 19.873 9.13513 19.8442 9.09885 19.8078L3.6301 14.3391C3.5568 14.2658 3.51562 14.1664 3.51562 14.0627C3.51563 13.9591 3.5568 13.8596 3.6301 13.7864C3.7034 13.7131 3.80281 13.6719 3.90647 13.6719C4.01012 13.6719 4.10954 13.7131 4.18283 13.7864L9.37522 18.9787L21.5989 6.7551C21.6721 6.6818 21.7716 6.64062 21.8752 6.64062C21.9789 6.64062 22.0783 6.6818 22.1516 6.7551C22.2249 6.8284 22.2661 6.92781 22.2661 7.03147C22.2661 7.13513 22.2249 7.23454 22.1516 7.30783Z" fill="black"/>
                                            </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="item-select">
                                <div className="item-book">
                                    4.75$ / KG
                                    <svg width="34" height="84" viewBox="0 0 34 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49967 21.1663L8.66634 12.833V8.66634H4.49967V0.333008H29.4997C30.6802 0.333008 31.6705 0.733008 32.4705 1.53301C33.2705 2.33301 33.6691 3.3219 33.6663 4.49967V8.66634L29.4997 16.9997H16.9997V12.833L8.66634 21.1663H4.49967ZM0.333008 83.6663V55.1247C0.333008 54.3608 0.455231 53.5441 0.699676 52.6747C0.94412 51.8052 1.23856 51.0247 1.58301 50.333L16.9997 21.1663H29.4997C30.4719 22.1386 31.4094 23.4413 32.3122 25.0747C33.215 26.708 33.6663 28.183 33.6663 29.4997V83.6663H0.333008ZM8.66634 75.333H25.333V29.4997H21.9997L8.66634 54.9163V75.333Z" fill="#4D89E2"/>
                                    </svg>
                                </div>
                                <div className="choose-stick flex align-items justify-between w-full">
                                    <h5> Cleaning </h5>
                                    <div className="circ-check" onClick={() => handleItemClick('cleaning')}>
                                        {selectedItems.cleaning && 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M22.1516 7.30783L9.65158 19.8078C9.61531 19.8442 9.57222 19.873 9.5248 19.8926C9.47738 19.9123 9.42655 19.9224 9.37522 19.9224C9.32388 19.9224 9.27305 19.9123 9.22563 19.8926C9.17821 19.873 9.13513 19.8442 9.09885 19.8078L3.6301 14.3391C3.5568 14.2658 3.51562 14.1664 3.51562 14.0627C3.51563 13.9591 3.5568 13.8596 3.6301 13.7864C3.7034 13.7131 3.80281 13.6719 3.90647 13.6719C4.01012 13.6719 4.10954 13.7131 4.18283 13.7864L9.37522 18.9787L21.5989 6.7551C21.6721 6.6818 21.7716 6.64062 21.8752 6.64062C21.9789 6.64062 22.0783 6.6818 22.1516 6.7551C22.2249 6.8284 22.2661 6.92781 22.2661 7.03147C22.2661 7.13513 22.2249 7.23454 22.1516 7.30783Z" fill="black"/>
                                            </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={ e => handleSubmitBooks(e,bookingInfo)} className="flex items-center justify-around flex-wrap books-form">
                            <div className="flex inputs-flex-form">
                                <div className="input-item"><input type="text" name="name" value={bookingInfo.firstname + " " + bookingInfo.lastname } onChange={e => handleInputChange(e)} placeholder='Username' /></div>
                                <div className="input-item"><input type="text" name="contact_no" value={bookingInfo.contact_no} readOnly onChange={e => handleInputChange(e)} placeholder='Contact No' /></div>
                                <div className="input-item"><input type="text" name="email" value={bookingInfo.email} readOnly onChange={e => handleInputChange(e)} placeholder='Email' /></div>
                            </div>
                            <div className="flex inputs-flex-form">
                                <div className="input-item"><input type="text" name="address" value={bookingInfo.address}  onChange={e => handleInputChange(e)} placeholder='Address' /></div>
                                <div className="input-item"><input type="text" name="zip_code" value={bookingInfo.zip_code}  onChange={e => handleInputChange(e)} placeholder='Zip Code' /></div>
                                <div className="input-item"><input type="text" name="return_date" value={bookingInfo.return_date}  onChange={e => handleInputChange(e)} placeholder='Return Date' /></div>
                            </div>
                            <div className="flex inputs-flex-form">
                                <div className="input-item"><input type="text" name="reservation_date" value={bookingInfo.reservation_date}  onChange={e => handleInputChange(e)} placeholder='Reservation Date' /></div>
                                <div className="input-item"><input type="text" name="time_delivery" value={bookingInfo.time_delivery}  onChange={e => handleInputChange(e)} placeholder='Time Delivery' /></div>
                                <div className="input-item"><input type="text" name="weights" value={bookingInfo.weights}  onChange={e => handleInputChange(e)} placeholder='Weight(Kg)' /></div>
                            </div>
                            <div className="flex inputs-flex-form">
                                <div className="input-item">
                                    <div className="tprice">
                                        <h2>
                                    Total Price || {
                                        bookingInfo.weights *
                                        (
                                            (selectedItems.cleaning ? 4.75 : 0) +
                                            (selectedItems.drying ? 2.5 : 0) +
                                            (selectedItems.washing ? 1.5 : 0) +
                                            (selectedItems.ironing ? 3.5 : 0) ||
                                            1 // Set the multiplier to 1 if all selected items are false
                                        )
                                    } $
                                        </h2>
                                    </div>
                                </div>
                                <div className="input-item">
                                    <div className="tprice">
                                        <h2>
                                            {
                                                Object.values(selectedItems).some((item) => item === true) ?
                                                (
                                                    <>
                                                        {Object.keys(selectedItems).map((service) => {
                                                            if (selectedItems[service]) {
                                                                return <p key={service}>{service.charAt(0).toUpperCase() + service.slice(1)}</p>;
                                                            }
                                                            return null;
                                                        })}
                                                    </>
                                                ) : 'Service/s Type'
                                            }
                                        </h2>
                                    </div>
                                </div>
                                <div className="input-item">
                                    <button className='w-full p-4 book-button'> 
                                        Book Order 
                                        {  booksStatus == true ? '✔️' : '' }

                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section> */}
                
                <section className="contact-us">
                    <div className="bg-img">
                        <img src="./img/laundry3.jpg" alt="" />
                    </div>
                    <div className="contact-us-comp flex flex-col justify-center">
                        <div className="container mx-auto text-white">
                            <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 p-4">
                                    <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
                                    <p className="text-sm mb-4">
                                        If you have any questions or need assistance, please don't hesitate to contact us.
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                        </div>
                                        <span>123 Main Street, City, Country</span>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M2 5a5 5 0 0110 0 5 5 0 01-10 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 21a5 5 0 01-10 0 5 5 0 0110 0z"
                                                />
                                            </svg>
                                        </div>
                                        <span>contact@laundry.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 20l4-16m2 16l4-16M6 9h14m-12 0a2 2 0 100-4 2 2 0 000 4z"
                                                />
                                            </svg>
                                        </div>
                                        <span>(123) 456-7890</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 p-4">
                                    <h3 className="text-lg font-semibold mb-2">Send a Message</h3>
                                    <form className="space-y-4">
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="text"
                                            placeholder="Your Name"
                                        />
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="email"
                                            placeholder="Your Email"
                                        />
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                            placeholder="Your Message"
                                        ></textarea>
                                        <button
                                            className="bg-white hover:bg-blue-400 text-black hover:text-white py-2 px-4 rounded"
                                            type="submit"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Home