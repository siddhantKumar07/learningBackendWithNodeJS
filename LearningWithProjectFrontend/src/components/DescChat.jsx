import React from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";

const DescChat = () => {
  return (
    <section className="flex h-full min-h-0 w-full flex-1 items-center justify-center bg-[#11182b] px-6 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 text-primary shadow-lg shadow-primary/10">
          <MessageCircle size={38} strokeWidth={1.8} />
        </div>

        <h1 className="text-2xl font-black text-[#dae2fd] sm:text-3xl">
          Your messages
        </h1>

        <p className="mt-3 leading-6 text-slate-400">
          Select a conversation from the sidebar to start chatting.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-400">
          <ArrowLeft size={16} />
          Choose a chat
        </div>
      </div>
    </section>
  );
};

export default DescChat;