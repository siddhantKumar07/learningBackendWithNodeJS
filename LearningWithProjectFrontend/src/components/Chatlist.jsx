import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
const Chatlist = () => {
    const dispatch = useDispatch();
const [data, setData] = useState(null)
const navigate = useNavigate();
   const handleClick=(id)=>{
    console.log("clicked",id);
    navigate(`/chat/${id}`);
    
   }

  useEffect(() => {
    const loadConnections = async () => {
      try {
        const res = await axios.get(base_url + "/user/connections", {
          withCredentials: true,
        });
        setData(res.data.allConnections);
        dispatch(addConnection(res.data.allConnections));
      } catch (err) {
        console.log(err.response?.data?.message || "Failed to load connections");
      }
    };
    loadConnections();
  }, []);

  return (
    <div className="w-[30%] h-screen backdrop-blur-3xl relative bg-white/5 flex items-center scrollbar-none flex-col pb-4 justify-start overflow-auto gap-2">
      <div className="h-28 px-4 bg-green-700 fixed to-0 w-full">
     <input className="py-2 px-2 h-10" type="text" placeholder="Search For user!" />
      </div>
<div className="w-full h-full flex-col overflow-scroll scrollbar-none gap-2 flex items-center justify-start mt-32">
        {data && data.length > 0 ? (
        data.map((connection) => (
          <div
          onClick={()=>{handleClick(connection._id)}}
            key={connection._id}
            className={`w-[96%] cursor-pointer backdrop-blur-3xl bg-black/40 shrink-0 h-20 border-2  border-transparent flex items-center gap-4 px-4 rounded-lg`}
          >
            <img
              src={connection.photoUrl}
              alt={`${connection.firstName} ${connection.lastName}`}
              className="rounded-full h-16 w-16 object-cover border"
            />
            <h1 className="text-xl text-white font-semibold capitalize">
              {connection.firstName} {connection.lastName}
            </h1>
          </div>
        ))
      ) : (
        <p className="text-lg text-black">No connections available</p>
      )}
</div>
    </div>
  );
};

export default Chatlist;