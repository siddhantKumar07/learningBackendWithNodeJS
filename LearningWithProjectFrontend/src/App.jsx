import React from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";
import Feed from "./pages/feed";
import Chat from "./pages/chat";
import PendingConnection from "./pages/PendingConnections";
import ChatSection from "./components/ChatSection";
import { ToastContainer, Bounce } from "react-toastify";
import Connections from "./pages/Connection";
import DescChat from "./components/DescChat";

const App = () => {
  return (
    <div>
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
    </div>
  );
};

export default App;
