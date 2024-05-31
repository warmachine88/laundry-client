import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';

const Book = () => {
  const userId = localStorage.getItem('id');
  const userEmail = localStorage.getItem('email');
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [booking, setBooking] = useState({
    user_id: userId,  
    firstname: '',
    lastname: '',
    email: userEmail,
    contact_no: '',
    reservation_date: '',
    return_date: '',
    address: '',
    time_delivery: '',
    weights: '',
    total_of_bills: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`/shops/${shopId}`);
        setShop(response.data);
        const parsedServices = JSON.parse(JSON.parse(response.data.services));
        setServices(parsedServices);
      } catch (err) {
        console.error('Error fetching shop:', err);
      }
    };

    fetchShop();
  }, [shopId]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    if (selectedServices.includes(value)) {
      setSelectedServices(selectedServices.filter(service => service !== value));
    } else {
      setSelectedServices([...selectedServices, value]);
    }
  };

  const calculateTotalOfBills = () => {
    const weight = parseFloat(booking.weights) || 0;
    return selectedServices.length * weight * 100;
  };

  useEffect(() => {
    setBooking(prevBooking => ({
      ...prevBooking,
      total_of_bills: calculateTotalOfBills()
    }));
  }, [selectedServices, booking.weights]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    try {
      const bookingData = { ...booking, service: selectedServices.join(', ') };
      await axios.post('/bookings/add', bookingData);
      setLoading(false);
      setSuccessMessage('Booking successful!');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setLoading(false);
      console.error('Error creating booking:', err);
      setSuccessMessage('Error creating booking. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        {shop ? (
          <>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-24">
              Book Services at {shop.name}
            </h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={booking.firstname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={booking.lastname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Service</label>
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        value={service}
                        checked={selectedServices.includes(service)}
                        onChange={handleServiceChange}
                        className="mr-2"
                      />
                      <label className="text-gray-700">{service}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Reservation Date</label>
                <input
                  type="date"
                  name="reservation_date"
                  value={booking.reservation_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Return Date</label>
                <input
                  type="date"
                  name="return_date"
                  value={booking.return_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={booking.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time of Delivery</label>
                <input
                  type="time"
                  name="time_delivery"
                  value={booking.time_delivery}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Weight (in Kg)</label>
                <input
                  type="number"
                  name="weights"
                  value={booking.weights}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total of Bills</label>
                <input
                  type="number"
                  name="total_of_bills"
                  value={booking.total_of_bills}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </form>
            {successMessage && (
              <div className={`mt-4 text-center ${successMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                {successMessage}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Book;
