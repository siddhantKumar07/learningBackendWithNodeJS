import React from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/appStore.js";
import Feed from "./pages/Feed.jsx";
import Chat from "./pages/Chat.jsx";
import PendingConnection from "./pages/PendingConnections.jsx";
import ChatSection from "./components/ChatSection.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import Connections from "./pages/Connection.jsx";
import DescChat from "./components/DescChat.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="pendingConnections" element={<PendingConnection />} />
          </Route>

          <Route path="/chat" element={<Chat />}>
            <Route index element={<DescChat />} />
            <Route path=":id" element={<ChatSection />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Provider>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
