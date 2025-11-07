import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col  sm:flex-row gap-5 border-t border-solid border-[#0000003b] justify-between items-center mt-32 sm:mt-auto pt-6 mb-10 ">
            <div className="flex flex-col  md:flex-row justify-between items-center md:items-baseline gap-4">
                <a href="/weather">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-[#ffffff85] bg-clip-text text-transparent">
                        Weather
                    </h1>
                </a>
                <p className="text-[14px] text-[#000000a8]">© 2025</p>
            </div>
            <div className="flex items-center gap-4">
                <a
                    href="/weather"
                    className="text-[14px] cursor-pointer text-[#000000a8] hover:text-[16px] hover:text-[#a8a2a2]"
                >
                    Політика конфіденційності
                </a>
                <a
                    href="/weather"
                    className="text-[14px] cursor-pointer text-[#000000a8] hover:text-[16px] hover:text-[#a8a2a2]"
                >
                    Угода користувача
                </a>
                <a
                    href="/weather"
                    className="text-[14px] cursor-pointer text-[#000000a8] hover:text-[16px] hover:text-[#a8a2a2]"
                >
                    Контакти
                </a>
            </div>
        </footer>
    );
};

export default Footer;
