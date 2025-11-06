import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row gap-5 border-t border-solid border-[#00000080] justify-between items-center mt-11 pt-6">
            <div className="flex justify-between items-center gap-4">
                <a href="/">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-black to-[#ffffff85] bg-clip-text text-transparent">
                        Weather
                    </h1>
                </a>
                <p className="text-[14px]">© 2025</p>
            </div>
            <div className="flex items-center gap-4">
                <a
                    href="/"
                    className="text-[14px] cursor-pointer text-black hover:text-[#6d6a6a]"
                >
                    Політика конфіденційності
                </a>
                <a
                    href="/"
                    className="text-[14px] cursor-pointer text-black hover:text-[#6d6a6a]"
                >
                    Угода користувача
                </a>
                <a
                    href="/"
                    className="text-[14px] cursor-pointer text-black hover:text-[#6d6a6a]"
                >
                    Контакти
                </a>
            </div>
        </footer>
    );
};

export default Footer;
