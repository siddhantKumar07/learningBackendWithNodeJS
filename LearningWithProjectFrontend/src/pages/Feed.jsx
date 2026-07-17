import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeedUser } from "../utils/feedSlice";
import axios from "axios";
import { base_url } from "../utils/constants";
import Card from "../components/Card";
import { motion as Motion } from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const feedUser = useSelector((store) => store.feed);
  const [swipe, setSwipe] = useState(null);
  const [noUsers, setNoUsers] = useState(false);

  useEffect(() => {
    if (feedUser.length > 0) return;

    const loadFeed = async () => {
      try {
        const response = await axios.get(base_url + "/user/feed", {
          withCredentials: true,
        });

        if (response.data.feedUser.length === 0) {
          setNoUsers(true);
          return;
        }
      console.log("hello i am feed ")
        dispatch(addFeed(response.data.feedUser));
      } catch (err) {
        if (err.response?.status === 404) {
          setNoUsers(true);
        } else {
          console.log(err.response?.data?.message);
        }
      }
    };

    loadFeed();
  }, [dispatch, feedUser.length]);

  if (noUsers) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-center mt-8">
          No users available for feed.
        </h1>
        <p className="text-center mt-4">
          Please check back later or update your profile to find more users.
        </p>
      </div>
    );
  }

  const handleDragEnd = async (_, info, user) => {
    const threshold = 150;
    const hasSwipedLeft = info.offset.x < -threshold;
    const hasSwipedRight = info.offset.x > threshold;

    if (!hasSwipedLeft && !hasSwipedRight) return;

    const status = hasSwipedLeft ? "interested" : "ignored";
    setSwipe({ userId: user._id, direction: hasSwipedLeft ? -1 : 1 });

    try {
      await axios.post(
        base_url + `/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err.response?.data?.message || "Unable to send request");
    }
  };

  const visibleUsers = feedUser.slice(-2); // back card + front card
  const backUser = visibleUsers.length === 2 ? visibleUsers[0] : null;
  const activeUser = visibleUsers.length === 2 ? visibleUsers[1] : visibleUsers[0];

  return (
    <div className="relative flex items-center justify-center h-[90vh] overflow-hidden">
      {backUser && (
        <Motion.div
          className="absolute"
          initial={{ scale: 0.92, y: 25, opacity: 0.75 }}
          animate={{ scale: 0.92, y: 25, opacity: 0.75 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 1 }}
        >
          <Card user={backUser} />
        </Motion.div>
      )}

      {activeUser && (
        <Motion.div
          key={activeUser._id}
          className="absolute"
          drag={swipe ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.65}
          dragMomentum={false}
          initial={{ x: 0, rotate: 0, opacity: 1, scale: 1 }}
          animate={
            swipe?.userId === activeUser._id
              ? {
                  x: swipe.direction * 1000,
                  rotate: swipe.direction * 22,
                  opacity: 0,
                  transition: { duration: 0.28, ease: "easeOut" },
                }
              : { x: 0, rotate: 0, opacity: 1 }
          }
          whileDrag={{ scale: 1.03, cursor: "grabbing" }}
          onDragEnd={(event, info) => handleDragEnd(event, info, activeUser)}
          onAnimationComplete={() => {
            if (swipe?.userId === activeUser._id) {
              dispatch(removeFeedUser(activeUser._id));
              setSwipe(null);
            }
          }}
          style={{ zIndex: 2 }}
        >
          <Card user={activeUser} show={true} />
        </Motion.div>
      )}
    </div>
  );
};

export default Feed;
