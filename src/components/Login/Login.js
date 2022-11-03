import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserInformationContext } from '../../contexts/UserInformContext/UserInformContext';
import './Login.css'
const Login = () => {
    const {loginUser} = useContext(UserInformationContext)
    const navigate = useNavigate()
    let location = useLocation()
    let from = location.state?.from?.pathname || '/'
    const handleLoginInfo = event =>{
        event.preventDefault()
        const form = event.target 
        const email = form.email.value 
        const password = form.password.value 
        loginUser(email, password)
        .then(res =>{
            const user = res.user 
            console.log(user)
            form.reset()
            navigate(from, {replace: true})
        })
        .catch(error =>{
            console.error(error)
        })
    }
    return (
        <div>
            <div className="form-container">
                <h3 className='form-title'>Login</h3>
                <hr />
                <form onSubmit={handleLoginInfo} action="">
                    <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input name='email' required id='email' type="email" />
                    </div>
                    <div className="form-control">
                    <label htmlFor="email">Password</label>
                    <br />
                    <input name='password' required id='password' type="password" />
                    </div>
                    <button type='submit'>login</button>
                    <p className='have-account'>New to ema john? <Link to={'/register'}>Create a new account!!</Link></p>
                    <hr />
                   <p style={{textAlign:'center'}}>or</p>
                    <hr />
                </form>
                    <button>Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;