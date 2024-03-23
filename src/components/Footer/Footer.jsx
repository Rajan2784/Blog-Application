import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import Container from "../Container/ContainerComp";
import { useSelector } from "react-redux";

const Footer = () => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <footer className="bg-gray-200 dark:bg-zinc-800 shadow-2xl py-8 bottom-0 w-full mt-5">
      <Container>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                Navigation
              </h3>
              <ul className="text-sm">
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-gray-900 dark:text-gray-200 hover:font-bold duration-300 hover:text-black dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                {userData && (
                  <li className="mb-2">
                    <Link
                      to="/all-posts"
                      className="text-gray-900 dark:text-gray-200 hover:font-bold duration-300 hover:text-black dark:hover:text-white"
                    >
                      All Posts
                    </Link>
                  </li>
                )}
                {userData && (
                  <li className="mb-2">
                    <Link
                      to="/add-post"
                      className="text-gray-900 dark:text-gray-200 hover:font-bold duration-300 hover:text-black dark:hover:text-white"
                    >
                      Add Post
                    </Link>
                  </li>
                )}
                <li className="mb-2">
                  <Link
                    href="/"
                    className="text-gray-900 dark:text-gray-200 hover:font-bold duration-300 hover:text-black dark:hover:text-white"
                  >
                    Contact us
                  </Link>
                </li>
                {/* Add more navigation links as needed */}
              </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                Social Media
              </h3>
              <ul className="flex items-center">
                <li className="mr-4">
                  <a
                    href="https://facebook.com"
                    className="dark:text-white w-48 h-48 text-2xl"
                    target="blank"
                  >
                    <FaFacebook />
                  </a>
                </li>
                <li className="mr-4">
                  <a
                    href="https://twitter.com"
                    className="dark:text-white text-2xl"
                    target="blank"
                  >
                    <BsTwitterX />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    className="dark:text-white text-2xl"
                    target="blank"
                  >
                    <FaInstagram width={48} height={48} />
                  </a>
                </li>
                {/* Add more social media icons and links as needed */}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
