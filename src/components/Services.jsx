import React from 'react';

const Services = () => {
    return (
        <section className="h-full overflow-hidden services-us bg-cover bg-center">
            <div className="bg-img">
                <img src="./img/laundry3.jpg" alt="" />
            </div>
            <div className="services-us-comp flex flex-col justify-center py-28">
                <div className="container mx-auto text-white">
                    <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Dry Cleaning</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                We provide top-notch dry cleaning services to keep your clothes looking fresh and clean.
                            </p>
                            <img src="./img/s1.jpg" alt="Dry Cleaning" className="mt-4 rounded-lg" />
                        </div>
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Wash & Fold</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Our wash and fold service ensures your clothes are properly washed and neatly folded.
                            </p>
                            <img src="./img/s4.jpg" alt="Wash & Fold" className="mt-4 rounded-lg" />
                        </div>
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Express Delivery</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                With our express delivery service, you'll get your clothes back in no time.
                            </p>
                            <img src="./img/s2.webp" alt="Express Delivery" className="mt-4 rounded-lg" />
                        </div>
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Eco-Friendly Cleaning</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                We care for the environment, which is why we use eco-friendly cleaning methods.
                            </p>
                            <img src="./img/s3.jpg" alt="Eco-Friendly Cleaning" className="mt-4 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
