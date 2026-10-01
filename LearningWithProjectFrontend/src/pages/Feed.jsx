import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Compass, Heart, X } from "lucide-react";
import axios from "axios";
import Card from "../components/Card";
import { base_url } from "../utils/constants";
import { addFeed, removeFeedUser } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feedUser = useSelector((store) => store.feed);
  const [swipe, setSwipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (feedUser.length) {
      setLoading(false);
      return;
    }

    const loadFeed = async () => {
      try {
        const response = await axios.get(`${base_url}/user/feed`, {
          withCredentials: true,
        });

        dispatch(addFeed(response.data.feedUser || []));
      } catch (error) {
        console.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, [dispatch, feedUser.length]);

  const handleDragEnd = async (_, info, user) => {
    if (swipe || Math.abs(info.offset.x) < 130) return;

    const direction = info.offset.x > 0 ? 1 : -1;
    const status = direction === -1 ? "interested" : "ignored";

    setSwipe({ userId: user._id, direction });

    try {
      await axios.post(
        `${base_url}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <main className="flex h-full min-h-0 w-full items-center justify-center bg-[#080d1d]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </main>
    );
  }

  const activeUser = feedUser.at(-1);
  const backUser = feedUser.at(-2);

  return (
    <main className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#080d1d]">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/5 px-5 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-3 text-white shadow-lg shadow-primary/25">
            <Compass size={22} />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
              Discover Connections
            </h1>
            <p className="text-xs text-slate-400">
              Find people who share your interests
            </p>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-4 py-5">
        {!activeUser && (
          <div className="text-center text-white">
            <div className="mb-5 text-6xl">✨</div>
            <h2 className="text-2xl font-black">You’re all caught up!</h2>
            <p className="mt-2 text-sm text-slate-400">
              Check back later for more connections.
            </p>
          </div>
        )}

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <AnimatePresence initial={false}>
            {backUser && (
              <Motion.div
                key={`back-${backUser._id}`}
                className="absolute"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 0.35, scale: 0.94, y: 14 }}
                transition={{ duration: 0.3 }}
                style={{ zIndex: 1, willChange: "transform, opacity" }}
              >
                <Card
                  user={backUser}
                  size="h-[min(70vh,38rem)] w-[min(88vw,27rem)]"
                />
              </Motion.div>
            )}

            {activeUser && (
              <Motion.div
                key={activeUser._id}
                className="absolute touch-pan-y"
                drag={swipe ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={
                  swipe?.userId === activeUser._id
                    ? {
                        x: swipe.direction * 900,
                        rotate: swipe.direction * 18,
                        opacity: 0,
                        transition: { duration: 0.35 },
                      }
                    : {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 0.3 },
                      }
                }
                whileDrag={{ scale: 1.02 }}
                onDragEnd={(event, info) =>
                  handleDragEnd(event, info, activeUser)
                }
                onAnimationComplete={() => {
                  if (swipe?.userId === activeUser._id) {
                    dispatch(removeFeedUser(activeUser._id));
                    setSwipe(null);
                  }
                }}
                style={{ zIndex: 2, willChange: "transform, opacity" }}
              >
                <Card
                  user={activeUser}
                  show
                  size="h-[min(70vh,38rem)] w-[min(88vw,27rem)]"
                />
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

      </section>
    </main>
  );
};

export default Feed;
