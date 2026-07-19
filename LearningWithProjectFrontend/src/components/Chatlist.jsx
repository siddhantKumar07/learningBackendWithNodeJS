import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";
import { Navigate, useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useSelector } from "react-redux";
const Chatlist = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const connections = useSelector((store) => store.connection);
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
const data = connections.filter((connection)=>{
return connection.firstName.toLowerCase().includes(value) || connection.lastName.toLowerCase().includes(value)
})
setData(data);
  }

  return (
    <div className="w-[30%] h-screen backdrop-blur-3xl relative bg-white/5 flex items-center scrollbar-none flex-col pb-4 justify-start overflow-auto gap-2">
      <div className="h-36 px-4 bg-black/40 backdrop-blur-3xl fixed to-0 w-full flex items-start justify-center gap-4 flex-col">
        <div className="flex items-center justify-center overflow-hidden gap-4">
          <div className="rounded-full h-14 w-14 bg-amber-500 ">
           {user?.photoUrl && <img className="rounded-full h-14 w-14 object-cover" src={user.photoUrl} alt="profile" />}
          </div>
            <Link to={'/'} className="text-white font-semibold text-3xl">Chats</Link>

        </div>
     <input onChange={handleSearch} className="py-3 text-lg w-full rounded-4xl px-4 h-12 bg-black/50 backdrop-blur-3xl text-white outline-none" type="text" placeholder="Search For user!" />
      </div>
<div className="w-full h-full flex-col overflow-scroll scrollbar-none gap-2 flex items-center justify-start mt-40">
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