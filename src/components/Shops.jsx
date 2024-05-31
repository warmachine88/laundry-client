import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Shops = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('/shops/get-all'); // Adjust the URL based on your backend setup
        setShops(response.data);
      } catch (err) {
        setError('Error fetching shops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleBookNow = (shopId) => {
    navigate(`/book/${shopId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="p-8 bg-sky-100 h-screen">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-24">
          Laundry Shops
        </h1>
        {shops.length === 0 ? (
          <p className="text-center text-gray-600">No shops available.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {shops.map((shop) => {
              let services = [];
              let contact = {};

              // Parse services if it's a valid double-encoded JSON string
              try {
                services = shop.services
                  ? JSON.parse(JSON.parse(shop.services))
                  : [];
              } catch (e) {
                console.error(
                  `Error parsing services for shop ID ${shop.id}:`,
                  e
                );
              }

              // Parse contact if it's a valid double-encoded JSON string
              try {
                contact = shop.contact
                  ? JSON.parse(JSON.parse(shop.contact))
                  : {};
              } catch (e) {
                console.error(
                  `Error parsing contact for shop ID ${shop.id}:`,
                  e
                );
              }

              return (
                <div
                  key={shop.id}
                  className="border border-gray-300 p-4 rounded-lg shadow-lg w-72 h-96 flex flex-col justify-between transform transition-transform hover:scale-105"
                >
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="w-full h-32 object-cover rounded-t-lg mb-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {shop.name}
                    </h2>
                    <p className="text-gray-600 mb-2">{shop.tagline}</p>
                    <p className="text-gray-600 mb-2">{shop.location}</p>
                    <p className="text-gray-600 mb-2">
                      {Array.isArray(services) ? services.join(', ') : ''}
                    </p>
                    <p className="text-gray-600 mb-2">
                      {contact.contact_no}
                    </p>
                    {contact.email && (
                      <p className="text-gray-600 mb-2">{contact.email}</p>
                    )}
                  </div>
                  <div>
                    <a
                      href={shop.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline mb-2 block text-center"
                    >
                      Facebook
                    </a>
                    <button
                      onClick={() => handleBookNow(shop.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Shops;