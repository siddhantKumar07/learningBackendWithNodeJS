import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState("");

  if (!user) return null;

  if (isEditing&&isEditing==="profileUpdate") {
    return (
      <EditProfile
        user={user}
        setIsEditing={setIsEditing}
      />
    );
  }
  else if(isEditing==="passwordUpdate"){
    return(
     <ChangePassword setIsEditing={setIsEditing}/>
    )
  }

  return (
    <div className="bg-[#0B1326] flex h-full w-full ml-auto mr-auto  px-3 py-3 items-center justify-center  relative text-black">
      <div className="bg-white shadow-xl rounded-3xl h-[95%] w-[80%] overflow-hidden  max-w-5xl">
        <div className="grid md:grid-cols-3 gap-2 py-2 px-3">
          {/* Left Side */}
          <div className="bg-gradient-to-b from-indigo-600 to-blue-500 rounded-2xl text-white flex flex-col items-center p-8">
            <img
              src={user.photoUrl}
              alt="Profile"
              className="w-45 h-45 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <h2 className="text-3xl font-bold mt-5 capitalize">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-indigo-100 text-xl mt-2">{user.emailId}</p>

        <div className='flex gap-8 w-full justify-center border-2 px-1 py-1 mt-10 rounded-3xl border-white/20'>
            <div className='flex flex-col gap-1 border-r-2 px-6'>
                <h1 className='text-white text-lg font-semibold'>Age</h1>
                <p className='text-white text-lg font-semibold'>{user.age}</p>
            </div>
            <div className='flex flex-col gap-1'>
                <h1 className='text-white text-lg font-semibold'>Gender</h1>
                <p className='text-white text-lg font-semibold capitalize'>{user.gender}</p>
            </div>
            
        </div>
            
          </div>

          {/* Right Side */}
          <div className="md:col-span-2 p-4">
            <h1 className="text-3xl font-bold underline text-gray-800 mb-6">
              Profile Information
            </h1>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                About
              </h2>

              <p className="text-gray-600 leading-7 capitalize">{user.about}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              <div>
                <p className="text-gray-500 text-lg">First Name</p>
                <p className="text-xl capitalize">{user.firstName}</p>
              </div>

              <div>
                <p className="text-gray-500 text-lg">Last Name</p>
                <p className="text-xl capitalize">{user.lastName}</p>
              </div>

              <div>
                <p className="text-gray-500 text-lg">Age</p>
                <p className="text-xl">{user.age}</p>
              </div>

              <div>
                <p className="text-gray-500 text-lg">Gender</p>
                <p className="text-xl capitalize">{user.gender}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-gray-500 text-lg">Email</p>
                <p className="text-xl">{user.emailId}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {user.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setIsEditing("profileUpdate")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl cursor-pointer"
              >
                Edit Profile
              </button>

              <button
                onClick={() => setIsEditing("passwordUpdate")}
                className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;