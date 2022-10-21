import React, { useContext, useState } from 'react';
import '../Login/Login.css'
import { Link } from 'react-router-dom';
import { UserInformationContext } from '../../contexts/UserInformContext/UserInformContext';
const Register = () => {
    const [passError, setPassError] = useState(null)
    const {createUser}= useContext(UserInformationContext)

   const handleUserAccount = event =>{
    event.preventDefault()
        const form = event.target 
        const email = form.email.value 
        const password = form.password.value 
        const confirmPass = form.confirm.value 
        if(password.length < 6){
            setPassError('Password must be six character or more')
            return
        }
        if(password !== confirmPass){
            setPassError('Your password does not matched')
            return
        }
        createUser(email,password)
        .then(res =>{
            const user = res.user 
            console.log(user)
            form.reset()
        })
        .catch(error =>{
            console.error(error)
        })
   }
    return (
        <div>
            <div className="form-container">
                <h3 className='form-title'>Register</h3>
                <hr />
                <form onSubmit={handleUserAccount} action="">
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input name='email' required type="email" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input name='password' required  type="password" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Confirm Password</label>
                        <br />
                        <input name='confirm' required  type="password" />
                    </div>
                    <button>Register</button>
                    <p className='have-account'>Already have an account? <Link to={'/login'}>Login</Link></p>
                    {passError && <span>{passError}</span>}
                    <hr />
                    <p style={{ textAlign: 'center' }}>or</p>
                    <hr />
                    <button>Continue With Google</button>
                </form>
            </div>
        </div>
    );
};

export default Register;