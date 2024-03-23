import React from "react";

const Loader = () => {
  return (
    <div className="border border-blue-300 shadow p-4 rounded-md max-w-sm w-40 h-40 sm:w-60 sm:h-60 md:h-60 md:w-60 mx-auto">
      <div className="animate-pulse flex flex-col gap-10 justify-center items-center space-x-4">
        <div className="rounded-3xl bg-slate-700 h-14 w-14 sm:h-28 sm:w-28 md:h-28 md:w-28"></div>
        <div className="space-y-1 py-1 w-full">
          <div className="h-1 bg-slate-700 rounded"></div>
          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-3">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
