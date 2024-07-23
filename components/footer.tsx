import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col md:flex-row-reverse bg-stone-700 bg-opacity-35 dark:bg-opacity-35 dark:bg-gray-800 text-white py-4 mt-2">
      <div className="flex flex-col mx-auto text-center px-4 mb-4 md:w-1/4">
        <p>Avda. del Tatuaje, nº1</p>
        <p>28091, Madrid</p>
        <p className="text-sm">&copy; 2024 Ink Spot. All rights reserved.</p>
      </div>
      <div className="w-auto flex flex-row items-center justify-between space-x-4 mx-auto">
        <Image
          src={"/instagram.svg"}
          alt="instagram logo"
          height={24}
          width={24}
          className="bg-yellow-400 dark:bg-white"
        ></Image>
        <Image
          src={"/linkedin.svg"}
          alt="instagram logo"
          height={30}
          width={30}
          className="bg-yellow-400 dark:bg-white rounded-lg"
        ></Image>
        <Image
          src={"/tiktok.svg"}
          alt="instagram logo"
          height={24}
          width={24}
          className="bg-yellow-400 dark:bg-white"
        ></Image>
      </div>
    </footer>
  );
};

export default Footer;
