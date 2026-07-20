import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../utils/constants";
import { useDispatch} from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import Card from "../components/Card";

const Connection = () => {
    const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
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
    handleConnection();
  }, [dispatch]);
  return (
    <div className="bg-[#0B1326] text-black h-full overflow-auto scrollbar-thin w-full flex justify-center flex-wrap gap-7 items-center p-6">
      {data && data.length > 0 ? (
        data.map((connec) => <Card key={connec._id} user={connec} size={"w-[min(22rem,92vw)] h-[min(28rem,78vh)]"} />)
      ) : (
        <div className="h-[90%] px-10 py-10 flex flex-wrap flex-col gap-6 justify-center items-center">
          <h1 className="text-3xl text-white font-bold text-center mt-8">No connections found.</h1>
          <p className="text-center mt-4 text-3xl text-white">
            Please check back later or explore other users to send connection requests.
          </p>
        </div>
      )}
    </div>
  )
};

export default Connection;
