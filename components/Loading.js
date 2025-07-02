import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <i className="text-slate-600 fa-solid fa-spinner animate-spin text-3xl sm:text-4xl"></i>
    </div>
  );
}
