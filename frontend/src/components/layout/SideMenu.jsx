import React, { useContext, useState } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../common/CharAvatar';
import Modal from '../common/Modal';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleClick = (route) => {
        if (route === "logout") {
            setIsLogoutModalOpen(true);
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/SignIn");
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-black border-r border-slate-700 p-5 sticky top-[61px] z-20'>
            <div className="flex flex-col items-center justify-center gap-5 mt-3 mb-7">
                <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" style="text-xl" />
                <h5 className='text-white font-medium leading-6'>{user?.fullName || ""}</h5>
            </div>


            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] cursor-pointer ${item.path === 'logout'
                            ? "text-primary hover:bg-red-500/10 border border-transparent hover:border-primary"
                            : activeMenu == item.label ? "text-white bg-primary" : "text-primary hover:bg-primary/10"
                        } py-3 px-6 rounded-lg mb-3 transition-all`}
                    onClick={() => { handleClick(item.path) }}>
                    <item.icon className='text-xl' />
                    {item.label}
                </button>
            ))}

            <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} title="Confirm Logout">
                <div>
                    <p className='text-sm text-white'>Are you sure you want to log out?</p>
                    <div className='flex justify-end mt-6'>
                        <button type='button' className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors' onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SideMenu;