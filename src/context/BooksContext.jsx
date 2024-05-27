import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const BookContext = createContext();

export const BooksProvider = ({children}) => {
    
    const { account } = useAuth()
    const [books,setBooks] = useState([])
    const [booksAdmin,setBooksAdmin] = useState([])
    const [booksStatus,setBooksStatus] = useState(null)
    
    useEffect(() => {
      const fetchAll = () => {
        fetch('http://localhost:5000/bookings/getAll',{
            method:'GET',
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
          console.log(account?.email)
          if (account?.email) {
            const dataBooks = data.filter(book => book.email === account.email)
            setBooks(dataBooks)
            setBooksAdmin(data)
          }
        })
      }
      fetchAll()
    },[account])

    function generateRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const [bookingInfo, setBookingInfo] = useState({
      user_id:generateRandomString(12),
      firstname: '',
      lastname: '',
      email:'',
      contact_no:'',
      address: '',
      reservation_date:'',
      return_date:'',
      zip_code:'',
      weights:'',
      time_delivery: '',
      service: {ironing:'', drying:'', cleaning:'', washing:''},
    });

    const handleDeleteBooks = (id) => {
      fetch(`http://localhost:5000/bookings/delete/${id}`, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          },
      })
      .then(response => response.json())
      .then(() => {
      // Filter out the deleted account from the allAccounts array
          setBooksAdmin(prevBooks => prevBooks.filter(books => books.id !== id));
      })
      .catch(error => {
      console.error(error);
      });
    };

    const handleEdit = async (e, updatedBooks) => {
      e.preventDefault();
      console.log(updatedBooks);
      try {
        const response = await fetch(`http://localhost:5000/bookings/update/${updatedBooks.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBooks),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Check the result and handle accordingly
        if (response.status === 200) {

          setBooksAdmin(prevBooks => {
            const updatedBooksAdmin = prevBooks.map(bookMark =>
              bookMark.id === updatedBooks.id ? { ...bookMark, ...updatedBooks } : bookMark
            );
            return updatedBooksAdmin;
          });
          
        } else {
          console.log('Update failed:', result.message);
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    };



    const handleSubmitBooks = async (e,books) => {
      e.preventDefault()
      try {

        const selectedServices = books.service;

        let totalPrice = 0;

        if (selectedServices.drying) totalPrice += 2.5;
        if (selectedServices.washing) totalPrice += 1.5;
        if (selectedServices.ironing) totalPrice += 3.5;
        if (selectedServices.cleaning) totalPrice += 4.75;
        
        // Check if any service is selected
        const anyServiceSelected = selectedServices.drying || selectedServices.washing || selectedServices.ironing || selectedServices.cleaning;
        
        // If no service is selected, set totalPrice to weights
        if (!anyServiceSelected) {
            totalPrice = parseFloat(books.weights);
        } else {
            // Multiply by weights if any service is selected
            totalPrice *= parseFloat(books.weights);
        }

        const booksFinal = {
            ...books,
            total_of_bills: totalPrice
        };

        const response = await fetch('http://localhost:5000/bookings/add',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
  
          body: JSON.stringify(booksFinal),
        })


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else if (response.status === 200 || response.status === 201) {

          console.log(response)
          const result = await response.json();
          setBookingInfo( (prevBookingInfo) => ({
            ...prevBookingInfo,
            user_id:generateRandomString(12),
            address: '',
            reservation_date:'',
            return_date:'',
            zip_code:'',
            weights:'',
            time_delivery: '',
            total_of_bills:'',
            service: {ironing:'', drying:'', cleaning:'', washing:''},
          }))
          setBooksStatus(true)
        }

      } catch (error) {
        console.log(error)
      }

    }

    const value = {   
      handleSubmitBooks,
      books,setBooks,
      handleDeleteBooks,
      booksStatus,setBooksStatus,
      booksAdmin,setBooksAdmin,
      generateRandomString,bookingInfo,setBookingInfo,
      handleEdit
    }

    return (
        <BookContext.Provider value={value}>
        {children}
        </BookContext.Provider>
    );
}

export const useBooks = () => {
  return useContext(BookContext);
};

