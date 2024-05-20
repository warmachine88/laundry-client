import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RegistrationForm() {


    const navigate = useNavigate()

    const { formSignUp,setFormSignUp,setErrorMessage,errorMessage } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users/sign-up', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formSignUp),
            });

            const data = await response.json();

            if (data?.error) {
                setErrorMessage(data.error);
            }
            console.log(data)

            if (data.id) {
                setFormSignUp({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    contact_no: '',
                    type:"client"
                })
                navigate('/login')
            } else {
                // console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormSignUp({
            ...formSignUp,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="register-component">
            <div className="circles tp1"></div>
            <div className="circles tp2"></div>
            <div className="circles tp3"></div>
            <div className="circles tp4"></div>
            <div className="container w-3/12">
                <h1> Sign Up </h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-text">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11.9999L8 15.9999H18V11.9999H12ZM9.06 3.1899L0 12.2499V15.9999H3.75L12.81 6.93989L9.06 3.1899ZM2.92 13.9999H2V13.0799L9.06 5.9999L10 6.93989L2.92 13.9999ZM15.71 4.0399C16.1 3.6499 16.1 2.9999 15.71 2.6299L13.37 0.289895C13.1825 0.103887 12.9291 -0.000488281 12.665 -0.000488281C12.4009 -0.000488281 12.1475 0.103887 11.96 0.289895L10.13 2.11989L13.88 5.86989L15.71 4.0399Z" fill="#8CBAFF"/>
                        </svg>
                        <div className="dp-inp">
                            <input
                            type="text"
                            placeholder="First Name"
                            name="firstname"
                            value={formSignUp.firstname}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="input-text">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11.9999L8 15.9999H18V11.9999H12ZM9.06 3.1899L0 12.2499V15.9999H3.75L12.81 6.93989L9.06 3.1899ZM2.92 13.9999H2V13.0799L9.06 5.9999L10 6.93989L2.92 13.9999ZM15.71 4.0399C16.1 3.6499 16.1 2.9999 15.71 2.6299L13.37 0.289895C13.1825 0.103887 12.9291 -0.000488281 12.665 -0.000488281C12.4009 -0.000488281 12.1475 0.103887 11.96 0.289895L10.13 2.11989L13.88 5.86989L15.71 4.0399Z" fill="#8CBAFF"/>
                        </svg>
                        <div className="dp-inp">
                            <input
                            type="text"
                            placeholder="Last Name"
                            name="lastname"
                            value={formSignUp.lastname}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="input-text">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1V0.5C0.867392 0.5 0.740215 0.552679 0.646447 0.646447C0.552679 0.740215 0.5 0.867392 0.5 1H1ZM19 1H19.5C19.5 0.867392 19.4473 0.740215 19.3536 0.646447C19.2598 0.552679 19.1326 0.5 19 0.5V1ZM1 1.5H19V0.5H1V1.5ZM18.5 1V13H19.5V1H18.5ZM17 14.5H3V15.5H17V14.5ZM1.5 13V1H0.5V13H1.5ZM3 14.5C2.60218 14.5 2.22064 14.342 1.93934 14.0607C1.65804 13.7794 1.5 13.3978 1.5 13H0.5C0.5 13.663 0.763392 14.2989 1.23223 14.7678C1.70107 15.2366 2.33696 15.5 3 15.5V14.5ZM18.5 13C18.5 13.3978 18.342 13.7794 18.0607 14.0607C17.7794 14.342 17.3978 14.5 17 14.5V15.5C17.663 15.5 18.2989 15.2366 18.7678 14.7678C19.2366 14.2989 19.5 13.663 19.5 13H18.5Z" fill="#8CBAFF"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L10 9.29289L18.6464 0.646447C18.8417 0.451184 19.1583 0.451184 19.3536 0.646447C19.5488 0.841709 19.5488 1.15829 19.3536 1.35355L10.3536 10.3536C10.1583 10.5488 9.84171 10.5488 9.64645 10.3536L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" fill="#8CBAFF"/>
                        </svg>
                        <div className="dp-inp">
                            <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formSignUp.email}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="input-text">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15C8 14.7348 7.89464 14.4804 7.70711 14.2929C7.51957 14.1054 7.26522 14 7 14C6.73478 14 6.48043 14.1054 6.29289 14.2929C6.10536 14.4804 6 14.7348 6 15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15C12 14.7348 11.8946 14.4804 11.7071 14.2929C11.5196 14.1054 11.2652 14 11 14C10.7348 14 10.4804 14.1054 10.2929 14.2929C10.1054 14.4804 10 14.7348 10 15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16ZM16 15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16C14.7348 16 14.4804 15.8946 14.2929 15.7071C14.1054 15.5196 14 15.2652 14 15C14 14.7348 14.1054 14.4804 14.2929 14.2929C14.4804 14.1054 14.7348 14 15 14C15.2652 14 15.5196 14.1054 15.7071 14.2929C15.8946 14.4804 16 14.7348 16 15Z" fill="#8CBAFF"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.75 6.99984C5.74826 5.72082 6.21349 4.48515 7.05833 3.52487C7.90317 2.56458 9.06951 1.94574 10.3383 1.78455C11.6072 1.62335 12.8912 1.93089 13.9493 2.64941C15.0074 3.36793 15.7669 4.44801 16.085 5.68684C16.1391 5.87443 16.2641 6.03355 16.4336 6.13039C16.6031 6.22724 16.8037 6.25417 16.9928 6.20548C17.1818 6.15678 17.3444 6.0363 17.446 5.86962C17.5477 5.70293 17.5803 5.5032 17.537 5.31284C17.1273 3.72094 16.1508 2.33323 14.7908 1.4101C13.4307 0.486963 11.7805 0.0918494 10.1498 0.298891C8.51912 0.505933 7.02003 1.3009 5.93379 2.53463C4.84756 3.76836 4.24885 5.35607 4.25 6.99984V8.30284C4.023 8.31884 3.81 8.33884 3.608 8.36684C2.708 8.48684 1.95 8.74684 1.348 9.34784C0.746 9.94984 0.488 10.7078 0.367 11.6078C0.25 12.4748 0.25 13.5778 0.25 14.9448V15.0548C0.25 16.4218 0.25 17.5248 0.367 18.3918C0.487 19.2918 0.747 20.0498 1.348 20.6518C1.95 21.2538 2.708 21.5118 3.608 21.6338C4.475 21.7498 5.578 21.7498 6.945 21.7498H15.055C16.422 21.7498 17.525 21.7498 18.392 21.6338C19.292 21.5118 20.05 21.2538 20.652 20.6518C21.254 20.0498 21.512 19.2918 21.634 18.3918C21.75 17.5248 21.75 16.4218 21.75 15.0548V14.9448C21.75 13.5778 21.75 12.4748 21.634 11.6078C21.512 10.7078 21.254 9.94984 20.652 9.34784C20.05 8.74584 19.292 8.48784 18.392 8.36684C17.525 8.24984 16.422 8.24984 15.055 8.24984H6.945C6.522 8.24984 6.124 8.24984 5.75 8.25284V6.99984ZM3.808 9.85284C3.074 9.95184 2.686 10.1328 2.409 10.4088C2.132 10.6858 1.952 11.0738 1.853 11.8088C1.752 12.5638 1.75 13.5648 1.75 14.9998C1.75 16.4348 1.752 17.4358 1.853 18.1918C1.952 18.9258 2.133 19.3138 2.409 19.5908C2.686 19.8678 3.074 20.0478 3.809 20.1468C4.563 20.2478 5.565 20.2498 7 20.2498H15C16.435 20.2498 17.436 20.2478 18.192 20.1468C18.926 20.0478 19.314 19.8668 19.591 19.5908C19.868 19.3138 20.048 18.9258 20.147 18.1908C20.248 17.4358 20.25 16.4348 20.25 14.9998C20.25 13.5648 20.248 12.5628 20.147 11.8078C20.048 11.0738 19.867 10.6858 19.591 10.4088C19.314 10.1318 18.926 9.95184 18.191 9.85284C17.436 9.75184 16.435 9.74984 15 9.74984H7C5.565 9.74984 4.563 9.75184 3.808 9.85284Z" fill="#8CBAFF"/>
                        </svg>
                        <div className="dp-inp">
                            <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formSignUp.password}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="input-text">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2 17.0002C13.3987 17.0002 11.5927 16.5855 9.782 15.7562C7.97133 14.9269 6.303 13.7492 4.777 12.2232C3.26367 10.6979 2.08933 9.0242 1.254 7.2022C0.418 5.3802 0 3.57954 0 1.8002V1.0002H4.438L5.287 5.0832L2.59 7.5932C3.04667 8.38387 3.51933 9.1062 4.008 9.7602C4.496 10.4135 5.005 11.0032 5.535 11.5292C6.06967 12.0892 6.67233 12.6125 7.343 13.0992C8.01433 13.5859 8.77933 14.0659 9.638 14.5392L12.25 11.8312L16 12.5872V17.0002H15.2ZM2.121 6.6542L4.213 4.7342L3.635 2.0002H1.005C1.025 2.76287 1.12767 3.5312 1.313 4.3052C1.49967 5.07854 1.769 5.86154 2.121 6.6542ZM10.571 14.9882C11.1863 15.2975 11.883 15.5389 12.661 15.7122C13.4383 15.8855 14.218 15.9775 15 15.9882V13.3852L12.612 12.9102L10.571 14.9882ZM8.923 8.0772V3.0772H9.923V6.3692L15.385 0.908203L16.092 1.6152L10.631 7.0772H13.923V8.0772H8.923Z" fill="#8CBAFF"/>
                        </svg>
                        <div className="dp-inp">
                            <input
                            type="text"
                            placeholder="Contact Number"
                            name="contact_no"
                            value={formSignUp.contact_no}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    {errorMessage && <p className="error-message py-2">{errorMessage}</p>}
                    <button type="submit"> Sign Up </button>
                </form>
            <p>Already have an account? <Link to="/login" className='login-fill'>Click here to login</Link></p>
            </div>
        </div>
    );
}

export default RegistrationForm;
