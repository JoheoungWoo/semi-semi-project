import React from "react";
import { Link } from "react-router-dom";
import products from "../dummydata/products.js";

const ListComponets = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">의류</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-md font-medium text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-bold">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListComponets;
