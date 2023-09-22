"use client";

import Loader from "./components/loader";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader size={35} />
    </div>
  );
};

export default Loading;
