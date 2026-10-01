import axios from "axios";
import React, { useEffect, useState } from "react";
import { Check, Clock3, UserRound, X } from "lucide-react";
import { base_url } from "../utils/constants";

const PendingConnection = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`${base_url}/user/pendingRequest`, {
          withCredentials: true,
        });

        setConnections(response.data.allPendingRequest || []);
      } catch (error) {
        console.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleClick = async (status, requestId) => {
    setProcessingId(requestId);

    try {
      await axios.post(
        `${base_url}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );

      setConnections((previous) =>
        previous.filter(
          (connection) => (connection._id || connection.id) !== requestId,
        ),
      );
    } catch (error) {
      console.error(error.response?.data?.message);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <main className="flex h-full min-h-0 w-full items-center justify-center bg-[#080d1d]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </main>
    );
  }

  if (!connections.length) {
    return (
      <main className="flex h-full min-h-0 w-full items-center justify-center bg-[#080d1d] px-6 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <Clock3 size={38} />
          </div>

          <h1 className="text-2xl font-black">No pending requests</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            You’re all caught up. New connection requests will appear here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full min-h-0 w-full overflow-y-auto bg-[#080d1d] px-4 py-6 text-white sm:px-8 lg:px-12">
      <header className="mx-auto mb-7 max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Community
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          Connection requests
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Review people who want to connect with you.
        </p>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {connections.map((connection) => {
          const requestId = connection._id || connection.id;
          const sender = connection.senderId;
          const isProcessing = processingId === requestId;

          return (
            <article
              key={requestId}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-lg shadow-black/20 transition-colors duration-200 hover:border-primary/40"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={sender?.photoUrl}
                  alt={`${sender?.firstName || "User"} profile`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-black capitalize">
                    {sender?.firstName} {sender?.lastName}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm text-white/70">
                    {sender?.about || "No introduction available."}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-5 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
                  <span className="text-slate-300">
                    {sender?.age ? `${sender.age} years` : "Age unavailable"}
                  </span>
                  <span className="capitalize text-slate-300">
                    {sender?.gender || "Not specified"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleClick("accepted", requestId)}
                    className="btn btn-primary rounded-xl border-0 font-bold shadow-lg shadow-primary/20 transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <Check size={18} />
                    )}
                    Accept
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleClick("rejected", requestId)}
                    className="btn rounded-xl border border-red-400/20 bg-red-500/10 font-bold text-red-300 transition-transform duration-150 hover:bg-red-500/20 active:scale-95 disabled:opacity-60"
                  >
                    <X size={18} />
                    Reject
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default PendingConnection;
