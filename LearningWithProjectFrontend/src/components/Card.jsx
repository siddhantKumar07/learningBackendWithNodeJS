import React from "react";
import { motion as Motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Heart, X } from "lucide-react";

const Card = ({ user, show = false, size }) => {
  const storedUser = useSelector((store) => store.user);

  const firstName = user?.firstName || storedUser?.firstName || "";
  const lastName = user?.lastName || storedUser?.lastName || "";

  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-black/40 ${size}`}
      style={{ contain: "layout paint", willChange: "transform" }}
    >
      <img
        src={user?.photoUrl}
        alt={`${firstName} ${lastName}`}
        draggable="false"
        loading="eager"
        className="absolute inset-0 h-full w-full select-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

      {show && (
        <div className="absolute left-4 right-4 top-4 flex justify-between">
          <div className="flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/20 px-3 py-2 text-sm font-bold text-emerald-100 backdrop-blur-md">
            <Heart size={16} />
            Interested
          </div>

          <div className="flex items-center gap-2 rounded-full border border-red-300/30 bg-red-500/20 px-3 py-2 text-sm font-bold text-red-100 backdrop-blur-md">
            Ignore
            <X size={16} />
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h2 className="text-3xl font-black capitalize tracking-tight">
          {firstName} {lastName}
        </h2>

        {user?.about && (
          <p className="mt-1 line-clamp-2 text-sm text-white/75">
            {user.about}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {Array.isArray(user?.skills) && user.skills.length > 0 ? (
            user.skills.slice(0, 5).map((skill, index) => (
              <Motion.span
                key={`${skill}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-full border border-white/15 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md"
              >
                {skill}
              </Motion.span>
            ))
          ) : (
            <span className="text-sm text-white/60">No skills listed</span>
          )}
        </div>

        <div className="mt-4 flex justify-between border-t border-white/20 pt-3 text-sm font-semibold text-white/80">
          <span>{user?.age ? `${user.age} years` : "Age unavailable"}</span>
          <span className="capitalize">{user?.gender || "Not specified"}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;