import React from "react";
import { motion as Motion } from "framer-motion";

const Card = ({ user }) => {
  return (
    <Motion.div
      className="hover-3d relative w-80 h-[32rem] rounded-2xl bg-white shadow-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <figure className="relative w-full h-full">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={user.photoUrl}
          alt="profile"
        />
        <div className="absolute inset-x-0 top-0  p-4 rounded-b-2xl">
          <div className="flex justify-between text-white font-semibold mt-1 gap-2">
            <span className="px-3 py-2 border-2 border-emerald-600 rounded-3xl text-green-900 font-bold text-xl"><i class="ri-arrow-left-long-line"></i>Interested</span>
            <span className="px-4 py-2 border-2 border-emerald-600 rounded-3xl text-red-700 font-bold text-xl">Ignore<i class="ri-arrow-right-long-line"></i></span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
          <h1 className="text-cyan-900 text-3xl font-bold capitalize underline">
            {user.firstName} {user.lastName}
          </h1>
          <h1 className="text-white font-bold capitalize">{user.about}</h1>
          <div className="flex justify-between text-white font-semibold mt-2 px-3.5">
            <span className="text-lg">{user.age}</span>
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