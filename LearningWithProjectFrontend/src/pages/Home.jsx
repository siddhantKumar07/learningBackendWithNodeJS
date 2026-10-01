import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../utils/constants.js";
import { addUser, removeUser } from "../utils/userSlice.js";
import SideBar from "../components/SideBar.jsx";
import { startPresence, stopPresence } from "../utils/socketClient.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${base_url}/profile/view`, {
          withCredentials: true,
        });

        dispatch(addUser(response.data.user));
      } catch {
        dispatch(removeUser());
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user?._id) return;

    startPresence(user._id);

    return () => {
      stopPresence();
    };
  }, [user?._id]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-950">
      <Navbar />

      <div className="flex min-h-0 w-full flex-1">
        <aside className="hidden h-full shrink-0 lg:block">
          <SideBar />
        </aside>

        <main className="h-full min-h-0 min-w-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
