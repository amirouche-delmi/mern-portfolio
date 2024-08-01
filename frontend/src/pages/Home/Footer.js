import React from "react";

function Footer() {
  return (
    <div className="py-10">
      <div className="h-[1px] w-full bg-gray-700"></div>
      <div className="flex items-center justify-center flex-col mt-10 opacity-70">
        <h1 className="text-white">Conçu et développé par</h1>
        <h1 className="text-white">
          <span className="text-white">Amirouche DELMI</span>
        </h1>
      </div>
    </div>
  );
}

export default Footer;
