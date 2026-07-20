import axios from "axios";
import React, { useState, useEffect } from "react";
import { base_url } from "../utils/constants";

const PendingConnection = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(base_url + "/user/pendingRequest", {
          withCredentials: true,
        });
        setConnections(response.data.allPendingRequest);
      } catch (err) {
        console.log(err.response?.data?.message);
      }
    };
    fetchConnections();
  },[]);

  const handleClick = async (status,requestId)=>{
    try{
const response = await axios.post(base_url+`/request/review/${status}/${requestId}`,{},{withCredentials:true})
console.log(response.data.message);
setConnections((prev)=>prev.filter((connection)=>connection.id!==requestId))
    }
    catch(err){
      console.log(err.response?.data?.message);
    }
  }
  if(!connections || connections.length === 0){
    return (
      <div className="bg-[#0B1326] h-full w-full px-10 py-10 flex flex-wrap flex-col gap-6 justify-center items-center">
        <h1 className="text-3xl text-white font-bold text-center mt-8">
          No pending connection requests.
        </h1>
        <p className="text-center text-2xl text-white mt-4">
          Please check back later or explore other users to send connection requests.
        </p>
      </div>
    );
  }
  return (
    <div className="h-[90%] px-10 py-10 flex flex-wrap gap-10 justify-center items-center">
      {connections.map((connection) => (
        <div
          className="relative isolate hover-3d w-80 h-3/4 rounded-2xl bg-base-100 shadow-xl transition-transform duration-300 hover:scale-105"
          key={connection.id}
        >
          <figure className="relative w-full rounded-2xl">
            <img
              className="pointer-events-none bg-cover h-full w-full"
              src={connection.senderId.photoUrl}
              alt="pic"
            />

            <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
              <h1 className="text-cyan-900 text-3xl font-bold capitalize underline">
                {connection.senderId.firstName} {connection.senderId.lastName}
              </h1>

              <h1 className="text-white font-bold capitalize">
                {connection.senderId.about}
              </h1>

              <div className="flex justify-between text-white font-semibold mt-2 px-3.5">
                <span className="text-lg">{connection.senderId.age}</span>
                <span className="capitalize text-lg">{connection.senderId.gender}</span>
              </div>

              <div className="pointer-events-auto relative z-50 flex items-center justify-between gap-3 mt-3">
                <button
                onClick={()=>{handleClick("accepted",connection?.id);}}
                  type="button"
                  className="transform-gpu cursor-pointer rounded-2xl  bg-green-600 px-4 py-2 text-lg text-black transition-transform duration-150 active:scale-90"
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={() => handleClick("rejected", connection?.id)}
                  className="transform-gpu cursor-pointer rounded-2xl bg-red-600 px-4 py-2 text-lg text-white transition-transform duration-150 active:scale-90"
                >
                  Reject
                </button>
              </div>
            </div>
          </figure>
        </div>
      ))}
    </div>
  );
};
export default PendingConnection;
