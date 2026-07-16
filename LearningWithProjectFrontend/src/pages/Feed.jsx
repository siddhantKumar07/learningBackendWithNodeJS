import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { base_url } from "../utils/constants";
const Feed = () => {
  const dispatch = useDispatch();
  const feedUser = useSelector((store) => store.feed);
  useEffect(() => {
    const loadFeed = async () => {
      try {
        const response = await axios.get(base_url + "/user/feed", {
          withCredentials: true,
        });
        console.log(response.data.feedUser);
        dispatch(addFeed(response.data.feedUser));
      } catch (err) {
        console.log(err.response?.data?.message);
      }
    };
    loadFeed();
  }, []);

  return (
    <div className="flex items-center justify-center h-[90%] relative overflow-hidden">
      {feedUser &&
        feedUser.map((user) => (
          <div
            className="hover-3d absolute   w-80 h-9/12 rounded-2xl bg-white shadow-lg "
            key={user._id}
          >
            <figure className="w-80 h-12/12 rounded-2xl">
              <h1 className="absolute bottom-20 left-6 text-black text-4xl font-bold z-10">
                {user.firstName + " " + user.lastName}
              </h1>
              <div className="absolute px-10 flex items-center justify-between bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black to-transparent rounded-b-2xl z-10">
                <h1 className=" text-black font-bold text-2xl z-10">
                  {user.age}
                </h1>
                <h1 className=" text-black font-bold text-2xl z-10">
                  {user.gender}
                </h1>
              </div>
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="https://i.pinimg.com/736x/8d/e9/85/8de985fef18ab2e8f64f210cd61df0b1.jpg"
                alt="pics"
              />
            </figure>
            {/* 8 empty divs needed for the 3D effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ))}
    </div>
  );
};

export default Feed;
