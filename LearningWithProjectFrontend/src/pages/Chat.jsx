import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";

const Chat = () => {
const [data, setData] = useState(null)

  useEffect(() => {
    const loadConnections = async () => {
      try {
        const res = await axios.get(base_url + "/user/connections", {
          withCredentials: true,
        });
        setData(res.data.allConnections);
      } catch (err) {
        console.log(err.response?.data?.message || "Failed to load connections");
      }
    };
    loadConnections();
  }, []);

  return (
    <div className="w-[22rem] h-[91%] bg-amber-200 flex items-center scrollbar-none flex-col py-4 justify-start overflow-auto gap-3">
      {data && data.length > 0 ? (
        data.map((connection) => (
          <div
            key={connection._id}
            className="w-[96%] shrink-0 h-20 bg-emerald-400 border-2 flex items-center gap-4 px-4 rounded-lg"
          >
            <img
              src={connection.photoUrl}
              alt={`${connection.firstName} ${connection.lastName}`}
              className="rounded-full h-16 w-16 object-cover border"
            />
            <h1 className="text-lg text-black">
              {connection.firstName} {connection.lastName}
            </h1>
          </div>
        ))
      ) : (
        <p className="text-lg text-black">No connections available</p>
      )}
    </div>
  );
};

export default Chat;