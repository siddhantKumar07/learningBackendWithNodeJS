import React from "react";
import { motion as Motion } from "framer-motion";
import { useSelector } from "react-redux";

const Card = ({ user,show}) => {
  const storedUser = useSelector((store) => store.user);
  return (
    <Motion.div
      className="hover-3d relative w-96 h-[32rem] bg-cover rounded-2xl bg-white shadow-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <figure className="relative w-full h-full rounded-2xl overflow-hidden ">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={user.photoUrl}
          alt="profile"
        />
        <div className="absolute inset-x-0 top-0  p-4 rounded-b-2xl">
{
  show&&(
              <div className={`flex justify-between text-white  font-semibold mt-1 gap-2 `}>
            <span className="px-3 py-2 border-2 border-emerald-600 backdrop-blur-3xl bg-white/2 rounded-2xl text-green-900 font-bold text-xl"><i class="ri-arrow-left-long-line text-2xl font-bold"></i> Interested</span>
            <span className="px-4 py-2 border-2 border-orange-600 backdrop-blur-3xl  bg-white/2 rounded-2xl text-red-700 font-bold text-xl">Ignore <i class="ri-arrow-right-long-line text-2xl font-bold"></i></span>
          </div>
  )
}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
          <h1 className="text-cyan-900 text-3xl font-bold capitalize underline">
            {user.firstName?user.firstName:storedUser.firstName} {user.lastName?user.lastName:storedUser.lastName}
          </h1>
          <h1 className="text-white font-bold capitalize">{user.about}</h1>
          <div>
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/30 backdrop-blur-3xl text-white px-3 py-1 rounded-full text-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white mt-2">No skills listed</p>
            )}
          </div>
          <div className="flex justify-between text-white font-semibold border-t-2 mt-2 px-3.5">
            <span className="text-lg">{user.age} years</span>
            <span className="capitalize text-lg">{user.gender}</span>
          </div>
        </div>
      </figure>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Motion.div>
  );
};

export default Card;