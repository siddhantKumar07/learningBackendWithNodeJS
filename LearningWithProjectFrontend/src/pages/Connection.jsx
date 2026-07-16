import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import Card from "../components/Card";

const Connection = () => {
    const [data, setData] = useState([]);
    const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const handleConnection = async () => {
    try {
      const response = await axios.get(base_url + "/user/connections", {
        withCredentials: true,
      });
      console.log(response.data.allConnections);
      dispatch(addConnection(response.data.allConnections));
      setData(response.data.allConnections);
      console.log("connections", data);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };
  useEffect(() => {
    handleConnection();
  }, [dispatch]);
  return (
    <div className="bg-gray-100 text-black min-h-[90vh] flex justify-center gap-7 items-center p-6">
      {data && data.length > 0 ? (
        data.map((connec) => <Card key={connec._id} user={connec} />)
      ) : (
        <div className="h-[90%] px-10 py-10 flex flex-wrap flex-col gap-10 justify-center items-center">
          <h1 className="text-2xl font-bold text-center mt-8">No connections found.</h1>
          <p className="text-center mt-4">
            Please check back later or explore other users to send connection requests.
          </p>
        </div>
      )}
    </div>
  )
};

export default Connection;
