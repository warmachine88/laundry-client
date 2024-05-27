import gsap from 'gsap';
import React, { useRef } from 'react';
import Navbar from './navbar/Navbar';

const About = () => {

    const imgRefs = useRef([])
    const textRefs = useRef([])

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
            duration:1.85,
            scale:1,
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

    return (
        <>
            <Navbar/>
            <section>
                <div className="about-us about-us-page">
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
        </>
    );
};

export default About;
