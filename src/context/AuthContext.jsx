import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [account,setAccount] = useState(null)
    const [allAccounts,setAllAccounts] = useState(null)
    const [errorMessage, setErrorMessage] = useState("");


    const [formSignUp, setFormSignUp] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        contact_no: '',
        type:"client"
    });

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        fetch('http://localhost:5000/users/get-all',{
            method:'GET',
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(usersData => { 
            console.log(usersData.length)
            setAllAccounts(usersData) 
        })
        .catch(error => {
            console.error(error);
        });
    },[])

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        fetch('http://localhost:5000/users/getUserByToken', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data.user) {
                // Hide Login and Register links
                
                fetch('http://localhost:5000/users/get-all',{
                    method:'GET',
                    headers: {
                    'Content-Type': 'application/json',
                },
                })
                .then(response => response.json())
                .then(usersData => {
                    const loggedInUserEmail = data.user.username;

                    const loggedInUser = usersData.find(user => user.email === loggedInUserEmail);
                    console.log(loggedInUser)
                    if (loggedInUser) {
                        setAccount(loggedInUser)
                    }
                })
                .catch(error => {
                    console.error(error);
                });
                localStorage.setItem('userToken', token);
            }
        })
        .catch(error => {
                console.error(error);
        });

    },[])

    const handleEdit = async (e, updatedAccountData) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/update-by-id/${updatedAccountData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify(updatedAccountData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            // Check the result and handle accordingly
            if (result.status === 200) {
                console.log('Update successful');
                // Update the allAccounts array with the edited account data if needed
                setAllAccounts(prevAccounts =>
                    prevAccounts.map(account =>
                        account.id === updatedAccountData.id ? { ...account, ...updatedAccountData } : account
                    )
                );
            } else {
                console.log('Update failed:', result.message);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    };


    const handleDelete = (id) => {
        fetch(`http://localhost:5000/users/delete-by-id/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(() => {
        // Filter out the deleted account from the allAccounts array
            setAllAccounts(prevAccounts => prevAccounts.filter(account => account.id !== id));
        })
        .catch(error => {
        console.error(error);
        });
    };



    return (
        <AuthContext.Provider value={
            { 
                formLogin,
                handleDelete,
                handleEdit, 
                formSignUp,
                allAccounts,
                setAllAccounts, 
                account,
                setAccount,
                setFormLogin,
                setFormSignUp,
                errorMessage,
                setErrorMessage 
            }}>
         {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
