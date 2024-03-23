import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-100 dark:bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="animate-spin rounded-full h-28 w-28 border-t-4 dark:border-gray-100 border-gray-900"></div>
    </div>
  );
};

export default Loading;
