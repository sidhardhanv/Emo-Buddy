import React from "react";

import Link from "next/link";
export function CreateImage() {
  return (
    // For mobile view
<div className="w-full h-screen">
  <img
    src="image/EMOBUDDYmedia.jpg"
    className="object-cover w-full h-full"
    alt="EmoBuddy"
  />
  {/* Text Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-7">
        <h1 className="text-4xl font-bold text-white"></h1>
        <div>
          <Link href="/faceapp">
          <button style={{ marginTop: "200px" }} className="px-11 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-50">
  Launch App
</button>
          </Link>
        </div>
        
      </div>
    </div>
    );
}
