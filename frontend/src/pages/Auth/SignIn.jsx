import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import {Link, useNavigate} from 'react-router-dom';
import Input from '../../components/common/Input';
import { validateEmail } from '../../utils/helper';
import axiosIntance from '../../utils/axiosIntance';
import { API_PATHS } from '../../utils/apiPaths';
import {UserContext} from '../../context/UserContext';

const SignIn = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);

  const {updateUser}=useContext(UserContext);
  const navigate=useNavigate();

  // Handle SignIn form submit
  const handleSignIn= async (e)=>{
      e.preventDefault();

      if(!validateEmail(email)){
          setError("please enter a valid email address!");
          return;
      }

      if(!password){
        setError("please enter the password!");
        return;
      }

      setError('');

      //SignIn API call
      try{
        const respose=await axiosIntance.post(API_PATHS.AUTH.SIGNIN,{email,password});
        const {token,user}=respose.data;

        if(token){
          localStorage.setItem("token",token);
          updateUser(user);
          navigate("/Dashboard");
        }
      }catch(error){
        if(error.respose && error.respose.data.message){
          setError(error.respose.data.message);
        }else{
          setError("Something went wrong!");
        }
      }
  }

  return (
    <AuthLayout>
      <div className='w-[80%] lg:w-[70%] flex flex-col justify-center'>
        <h3 className='text-xl md:text-2xl font-medium text-white text-center mb-3'>Welcome back!</h3>
        <p className='text-xs text-white mt-[5px] mb-3 md:mb-6'>Please sign in to open your account.</p>

        <form onSubmit={handleSignIn}>
          <Input value={email} onChange={({target})=>setEmail(target.value)} label="Email Address" placeholder="Enter your Email" type="text"/>
          <Input value={password} onChange={({target})=>setPassword(target.value)} label="Password" placeholder="Enter your Password" type="password"/>
           {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
           <button type='submit' className='btn-primary'>SignIn</button>
           <p className='text-[13px] text-white mt-3'>Don't have an Account?{" "}<Link className='font-medium text-primary underline' to="/SignUp">SignUp</Link></p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignIn;