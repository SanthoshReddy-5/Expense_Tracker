import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import ProfilePhotoSelector from '../../components/common/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';
import axiosIntance from '../../utils/axiosIntance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const  SignUp= () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //handle signUp
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("please enter your name!");
      return;
    }

    if (!validateEmail(email)) {
      setError("please enter a valid email address!");
      return;
    }

    if (!password) {
      setError("please enter the password!");
      return;
    }
    setError('');

    //signup API call
    try {

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const respose = await axiosIntance.post(API_PATHS.AUTH.SIGNUP, { fullName, email, password, profileImageUrl });
      const { token, user } = respose.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/Dashboard");
      }
    } catch (error) {
      if (error.respose && error.respose.data.message) {
        setError(error.respose.data.message);
      } else {
        setError("Something went wrong!");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="w-[80%] lg:w-[75%] h-auto md:h-full md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-white text-center">Create an account</h3>
        <p className='text-xs text-white mt-[5px] mb-6 text-center'>
          Join us today by entering your details below!
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className='col-span-2 md:col-span-1'>
               <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="Enter your Full Name" type="text" />
            </div>
             <div className='col-span-2 md:col-span-1'>
               <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="Enter Your Email" type="text" />
            </div>
            <div className="col-span-2">
              <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Enter your Password" type="password" />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>SignUp</button>
          <p className='text-[13px] text-white mt-3'>Do you have an Account Already?{" "}<Link className='font-medium text-primary underline' to="/SignIn">SignIn</Link></p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp;