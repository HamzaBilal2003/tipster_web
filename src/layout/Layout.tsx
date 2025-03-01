import React, { useState } from 'react';
import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';
import Profile from './components/Profile';
// import { Topbar_profile_Left } from '../dummyData/Data';

const Layout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div
                    className={`fixed lg:static top-0 left-0 z-20 transition-transform transform bg-[#0C0C0C] text-white z-[101] ${
                        mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:w-fit`}
                >
                    <Sidebar setMobileOpen={setMobileOpen} />
                </div>
                {/* Main Content */}
                <div className="w-full h-screen overflow-auto transition-all duration-300">
                    <div>
                        <div className="min-h-[72px] sticky top-0 z-[100] flex justify-between items-center px-4 md:px-8 py-3 bg-white shadow shadow-gray-400">
                            <div className="flex items-center gap-2">
                                <button
                                    className="block lg:hidden"
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                >
                                    <i className="bi bi-list text-black text-4xl"></i>
                                </button>
                            </div>
                            <div>
                                <Profile />
                            </div>
                        </div>
                        <div className="px-4 md:px-8 py-8">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
