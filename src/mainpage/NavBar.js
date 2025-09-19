import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const moveToProductListHandler = () => {
    navigate("/list");
  };
  return (
    <nav className="bg-white border-t border-b border-gray-200 shadow-sm sticky top-0 w-full z-10">
      <div className="container mx-auto px-4 py-2">
        <ul className="flex justify-between text-sm font-medium text-gray-700">
          <li>
            <button
              className="hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 pb-2"
              onClick={moveToProductListHandler}
            >
              의류
            </button>
          </li>
          <li>
            <button
              className="hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 pb-2"
              onClick={moveToProductListHandler}
            >
              산책&외출
            </button>
          </li>
          <li>
            <button
              className="hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 pb-2"
              onClick={moveToProductListHandler}
            >
              라이프
            </button>
          </li>
          <li>
            <button
              className="hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 pb-2"
              onClick={moveToProductListHandler}
            >
              장난감
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
