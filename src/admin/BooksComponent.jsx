import React, { useEffect, useState } from 'react'
import { useBooks } from '../context/BooksContext';

const useDebounce = (value,delay) => {
    const [debouncedValue,setDebounceValue] = useState(value)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value)
        },delay)

        return () => {
            clearTimeout(timeoutId)
        }
    },[value,delay])

    return debouncedValue
}

const BooksComponent = ({ theme }) => {

    const [updatedBooks, setUpdatedBooks] = useState(
        {
            email: '', 
            firstname: '', 
            lastname: '', 
            contact_no:'', 
            service:'{"ironing":"","drying":"","cleaning":"","washing":""}', 
            reservation_date:'',
            return_date:'',
            zip_code:'',
            time_delivery:'',
            weights:'',
            total_of_bills:'',
    });

    const { handleDeleteBooks, handleEdit,errorMessage,setErrorMessage,booksAdmin,setBooks } = useBooks()
  
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [search,setSearch] = useState('')

    const debouncedSearch = useDebounce(search,750)


    const [filteredBooks, setFilteredBooks] = useState(booksAdmin);

    useEffect(() => {
        setFilteredBooks(booksAdmin);
    }, [booksAdmin]);

    // This effect updates filteredCustomerAccounts whenever debouncedSearch or customerAccounts changes
    useEffect(() => {
        if (debouncedSearch.trim() === '') {
            setFilteredBooks(booksAdmin);
        } else {
            const lowercasedSearch = debouncedSearch.toLowerCase();
            const results = filteredBooks.filter(
                (account) =>
                account?.email?.toLowerCase().includes(lowercasedSearch) ||
                account?.contact?.toLowerCase().includes(lowercasedSearch)
            );
            setFilteredBooks(results);
        }
    })

        // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentAdminItems = filteredAdminAccounts.slice(indexOfFirstItem, indexOfLastItem);
    const booksItemRefine = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);


    const handleUpdate = (id) => {
        const booksMark = booksAdmin.find(books => books.id === id);
        console.log(booksMark)
        setUpdatedBooks(booksMark);
    }

    // Change page
    const paginate = (direction) => {
        if (direction === 'next' && currentPage < Math.ceil(booksAdmin.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
        else if (direction === 'previous' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }


    return (
        <div className='books-admin'>
           <h1> Books Laundry </h1>
            <div className="headbar">
                <div className="pages">

                    <svg 
                        width="11" height="18" 
                        viewBox="0 0 11 18" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => paginate('previous')}
                    >
                    <path d="M0 9L9 18L10.4 16.5L3 9L10.4 1.5L9 0L0 9Z" fill={ theme ? "#fff" : "#000"}/>
                    </svg>
                    <h3> {currentPage} </h3>
                    <svg 
                        width="11" 
                        height="18" 
                        viewBox="0 0 11 18" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => paginate('next')}
                    >
                    <path d="M1.99961 0L0.599609 1.5L7.99961 9L0.599609 16.5L1.99961 18L10.9996 9L1.99961 0Z" fill={ theme ? "#fff" : "#000"}/>
                    </svg>

                </div>
                <div className="search-bar">
                    <input type="text" placeholder='Search Email / Contact' value={search} onChange={e => setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="editor">
                <h2>  Editor </h2>
                <form onSubmit={e => handleEdit(e,updatedBooks)}>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Email" value={updatedBooks.email} onChange={e => setUpdatedBooks({...updatedBooks, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Firstname" value={updatedBooks.firstname} onChange={e => setUpdatedBooks({...updatedBooks, firstname: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Lastname" value={updatedBooks.lastname} onChange={e => setUpdatedBooks({...updatedBooks, lastname: e.target.value})} />
                    </div>
                    <div className="form-group grid-form">
                        <select className='form-control' onChange={e => setUpdatedBooks({...updatedBooks, service: {...updatedBooks.service, ironing: e.target.value}})} value={JSON.parse(updatedBooks?.service).ironing ? "Ironing" : ""}>
                            {updatedBooks?.service !== "" && <option value="">Select</option>}
                            <option value={"Ironing"}> Ironing </option>
                            <option value={"Drying"}> Drying </option>
                            <option value={"Cleaning"}> Cleaning </option>
                            <option value={"Washing"}> Washing </option>
                        </select>
                        <select className='form-control' onChange={e => setUpdatedBooks({...updatedBooks, service: {...updatedBooks.service, drying: e.target.value}})} value={JSON.parse(updatedBooks?.service).drying ? "Drying" : ""}>
                            {updatedBooks?.service !== "" && <option value="">Select</option>}
                            <option value={"Ironing"}> Ironing </option>
                            <option value={"Drying"}> Drying </option>
                            <option value={"Cleaning"}> Cleaning </option>
                            <option value={"Washing"}> Washing </option>
                        </select>
                        <select className='form-control' onChange={e => setUpdatedBooks({...updatedBooks, service: {...updatedBooks.service, cleaning: e.target.value}})} value={JSON.parse(updatedBooks?.service).cleaning ? "Cleaning" : ""}>
                            {updatedBooks?.service !== "" && <option value="">Select</option>}
                            <option value={"Ironing"}> Ironing </option>
                            <option value={"Drying"}> Drying </option>
                            <option value={"Cleaning"}> Cleaning </option>
                            <option value={"Washing"}> Washing </option>
                        </select>
                        <select className='form-control' onChange={e => setUpdatedBooks({...updatedBooks, service: {...updatedBooks.service, washing: e.target.value}})} value={JSON.parse(updatedBooks?.service).washing ? "Washing" : ""}>
                            {updatedBooks?.service !== "" && <option value="">Select</option>}
                            <option value={"Ironing"}> Ironing </option>
                            <option value={"Drying"}> Drying </option>
                            <option value={"Cleaning"}> Cleaning </option>
                            <option value={"Washing"}> Washing </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Contact" value={updatedBooks.contact_no} onChange={e => setUpdatedBooks({...updatedBooks, contact_no: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Reservation" value={updatedBooks.reservation_date} onChange={e => setUpdatedBooks({...updatedBooks, reservation_date: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Return" value={updatedBooks.return_date} onChange={e => setUpdatedBooks({...updatedBooks, return_date: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Zip Code" value={updatedBooks.zip_code} onChange={e => setUpdatedBooks({...updatedBooks, zip_code: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Time Delivery" value={updatedBooks.time_delivery} onChange={e => setUpdatedBooks({...updatedBooks, time_delivery: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Weights" value={updatedBooks.weights} onChange={e => setUpdatedBooks({...updatedBooks, weights: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Total Price" value={updatedBooks.total_of_bills} onChange={e => setUpdatedBooks({...updatedBooks, total_of_bills: e.target.value})} />
                    </div>
                    <div className="form-group button-side">
                        <button className="btn btn-success" type="submit">Confirm Update</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </form>
            </div>
            <div className="list-account-section">
                <div className="list-account-table">
                    <table className='table table-responsive table-dark table-striped table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                                <th scope="col">Service</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Reserve Date</th>
                                <th scope="col">Return Date</th>
                                <th scope="col">Zip Code</th>
                                <th scope="col">Time Delivery</th>
                                <th scope="col">Weights</th>
                                <th scope="col">Total Bills</th>
                                <th scope="col" className='th-edit'> 
                                    Del / Edit
                                 </th>
                            </tr>
                        </thead>
                        <tbody>
                            {booksItemRefine.map(bookItem => (
                                <tr key={bookItem.id}>
                                    <td>{bookItem.email}</td>
                                    <td>{bookItem.firstname} {bookItem.lastname}</td>
                                    <td>
                                        {bookItem.service && (
                                            <>
                                                {JSON.parse(bookItem.service).ironing && <p>Ironing</p>}
                                                {JSON.parse(bookItem.service).drying && <p>Drying</p>}
                                                {JSON.parse(bookItem.service).cleaning && <p>Cleaning</p>}
                                                {JSON.parse(bookItem.service).washing && <p>Washing</p>}
                                            </>
                                        )}
                                    </td>
                                    <td>{bookItem.contact_no}</td>
                                    <td>{bookItem.reservation_date}</td>
                                    <td>{bookItem.return_date}</td>
                                    <td>{bookItem.zip_code}</td>
                                    <td>{bookItem.time_delivery}</td>
                                    <td>{bookItem.weights}</td>
                                    <td>{bookItem.total_of_bills}</td>
                                    <td className='th-edit'>
                                        <svg onClick={ e => handleDeleteBooks(bookItem.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill={ theme ? "#fff" : "#000"}/>
                                        </svg>
                                        <svg onClick={ e => handleUpdate(bookItem.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clipPath="url(#clip0_736_25)">
                                                <path d="M13 3C13.2549 3.00028 13.5 3.09788 13.6854 3.27285C13.8707 3.44782 13.9822 3.68695 13.9972 3.94139C14.0121 4.19584 13.9293 4.44638 13.7657 4.64183C13.6021 4.83729 13.3701 4.9629 13.117 4.993L13 5H5V19H19V11C19.0003 10.7451 19.0979 10.5 19.2728 10.3146C19.4478 10.1293 19.687 10.0178 19.9414 10.0028C20.1958 9.98789 20.4464 10.0707 20.6418 10.2343C20.8373 10.3979 20.9629 10.6299 20.993 10.883L21 11V19C21.0002 19.5046 20.8096 19.9906 20.4665 20.3605C20.1234 20.7305 19.6532 20.9572 19.15 20.995L19 21H5C4.49542 21.0002 4.00943 20.8096 3.63945 20.4665C3.26947 20.1234 3.04284 19.6532 3.005 19.15L3 19V5C2.99984 4.49542 3.19041 4.00943 3.5335 3.63945C3.87659 3.26947 4.34684 3.04284 4.85 3.005L5 3H13ZM19.243 3.343C19.423 3.16365 19.6644 3.05953 19.9184 3.05177C20.1723 3.04402 20.4197 3.13322 20.6103 3.30125C20.8008 3.46928 20.9203 3.70355 20.9444 3.95647C20.9685 4.2094 20.8954 4.46201 20.74 4.663L20.657 4.758L10.757 14.657C10.577 14.8363 10.3356 14.9405 10.0816 14.9482C9.82767 14.956 9.58029 14.8668 9.38972 14.6988C9.19916 14.5307 9.07969 14.2964 9.0556 14.0435C9.03151 13.7906 9.10459 13.538 9.26 13.337L9.343 13.243L19.243 3.343Z" fill={ theme ? "#fff" : "#000"}/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_736_25">
                                                <rect width="24" height="24" fill={ theme ? "#fff" : "#000"}/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BooksComponent