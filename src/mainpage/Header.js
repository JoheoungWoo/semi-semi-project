import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white border-b border-gray-200 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 font-extrabold text-3xl text-gray-800 drop-shadow-md"
          >
            POPPY
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <nav className="space-x-4 text-sm text-gray-600">
              <button className="hover:text-gray-900 focus:outline-none">
                LOGIN
              </button>
              <button className="hover:text-gray-900 focus:outline-none">
                JOIN US
              </button>
              <button className="hover:text-gray-900 focus:outline-none">
                CART
              </button>
              <button className="hover:text-gray-900 focus:outline-none">
                ORDER
              </button>
              <button className="hover:text-gray-900 focus:outline-none">
                MY PAGE
              </button>
            </nav>
          </div>
        </div>
      </header>
      <div className="h-10"></div>
    </>
  );
};

export default Header;
