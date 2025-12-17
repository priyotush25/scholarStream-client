import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { PiUserCircle } from 'react-icons/pi';
import dayjs from 'dayjs';

const MyProfile = () => {
    const { user } = useAuth();
    const { role } = useRole();

    return (
        <div className="flex justify-center items-start pt-10 min-h-[60vh]">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200">
                <figure className="px-10 pt-10">
                    <div className="avatar placeholder">
                        <div className="bg-primary/10 text-primary rounded-full w-32 ring ring-primary ring-offset-base-100 ring-offset-2">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" />
                            ) : (
                                <span className="text-5xl font-bold uppercase">{user?.displayName?.charAt(0) || 'U'}</span>
                            )}
                        </div>
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-3xl font-bold mb-1">{user?.displayName}</h2>
                    <p className="text-base-content/70 font-medium mb-4">{user?.email}</p>

                    <div className="badge badge-primary badge-lg uppercase font-semibold tracking-wider mb-6 pb-4 pt-4 px-6 rounded-full">
                        {role || 'Student'}
                    </div>

                    <div className="w-full border-t border-base-200 mt-2 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col p-3 bg-base-200/50 rounded-box">
                                <span className="text-xs uppercase tracking-wide opacity-50">Status</span>
                                <span className="font-semibold text-success">Active</span>
                            </div>
                            <div className="flex flex-col p-3 bg-base-200/50 rounded-box">
                                <span className="text-xs uppercase tracking-wide opacity-50">Member Since</span>
                                <span className="font-semibold">{user?.metadata?.creationTime ? dayjs(user.metadata.creationTime).format('DD MMMM YYYY') : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;