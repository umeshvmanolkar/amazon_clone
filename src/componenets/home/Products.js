import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import GradeIcon from "@mui/icons-material/Grade";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addToCart, addToWhishlist, viewProductDetails } from "../../redux/amazonSlice";

const Products = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();

  const [addWhishlist, setWishList] = useState(false);
  const productData = data.data;

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10">
      {productData.map((items) => (
        <div
          key={items.id}
          className="bg-white h-auto border-[1px] py-8 z-30 hover:border-transparent shadow-none hover:shadow-textShadow duration-200 relative flex flex-col gap-4"
        >
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
            {items.category}
          </span>
          <div className="w-full h-auto flex items-center justify-center px-4 relative group">
            <img
              className="w-52 h-64 object-contain"
              src={items.image}
              alt="Product Image"
            />
            <ul className="w-full h-36 bg-gray-100 absolute bottom-[-170px] duration-700 flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-1 border-r group-hover:bottom-0">
              <li 
              onClick={() => {
                dispatch(
                  addToCart({
                    id: items.id,
                    title: items.title,
                    description: items.description,
                    price: items.price,
                    category: items.category,
                    image: items.image,
                    quantity: 1,
                  })
                );
              }}
              
              className="text-gray-600 hover:text-black text-sm font-medium border-b-[1px] border-b-gray-400 hover:border-b-gray-700 flex items-center justify-end gap-2 hover:cursor-pointer duration-300 w-full">
                Add to Cart{" "}
                <span>
                  <ShoppingCartIcon />
                </span>
              </li>
              
              <Link to={`/productDeatils/${items.id}`}>
              <li 
              onClick={() => {
               dispatch(
                 viewProductDetails({
                   id: items.id,
                   title: items.title,
                   description: items.description,
                   price: items.price,
                   category: items.category,
                   image: items.image,
                   quantity: 1,
                 })
               );
             }}
             className="text-gray-600 hover:text-black text-sm font-medium border-b-[1px] border-b-gray-400 hover:border-b-gray-700 flex items-center justify-end gap-2 hover:cursor-pointer duration-300 w-full">
               View Details{" "}
               <span>
                 <ArrowCircleRightIcon />
               </span>
             </li>
             
              </Link>
              
              <li 
              onClick={() => {
                setWishList(true);
                dispatch(
                  addToWhishlist({
                    id: items.id,
                    title: items.title,
                    description: items.description,
                    price: items.price,
                    category: items.category,
                    image: items.image,
                    quantity: 1
                  })
                );
              }}
              className="text-gray-600 hover:text-black text-sm font-medium border-b-[1px] border-b-gray-400 hover:border-b-gray-700 flex items-center justify-end gap-2 hover:cursor-pointer duration-300 w-full">
                Add to Wishlist{" "}
                {
                  addWhishlist ? (
                    <span className="text-red-600">
                    <FavoriteIcon />
                  </span>
                  ):(
                    <span>
                    <FavoriteIcon />
                  </span>
                  )
                }
                
              </li>
            </ul>
          </div>
          <div className="px-4 z-10 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_light font-medium">
                {items.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ${items.price}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1">
                {items.description.substring(0, 100)}...
              </p>
              <div className="text-yellow-500">
                <GradeIcon />
                <GradeIcon />
                <GradeIcon />
                <GradeIcon />
              </div>
            </div>

            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    id: items.id,
                    title: items.title,
                    description: items.description,
                    price: items.price,
                    category: items.category,
                    image: items.image,
                    quantity: 1,
                  })
                );
              }}
              className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
