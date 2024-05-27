import React from 'react'
import Navbar from './navbar/Navbar'

const Contact = () => {
    return (
        <>
        <Navbar/>        
        <section className="contact-us">
            <div className="bg-img">
                <img src="./img/laundry3.jpg" alt="" />
            </div>
            <div className="contact-us-comp contact-us-page flex flex-col justify-center">
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
        </>
    )
}

export default Contact