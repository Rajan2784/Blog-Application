import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
    {
      name: "My Posts",
      path: "/my-post",
      active: authStatus,
    },
  ];

  const location = useLocation();
  let darkMode = localStorage.getItem("dark");
  const [dark, setDark] = useState(darkMode || "light");
  document.documentElement.classList.add(darkMode);

  // Function to handle the click event
  const handleTheme = () => {
    if (dark === "light") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("dark", "dark");
      setDark("dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "light");
      setDark("light");
    }
  };

  const [searchContent, setSearchContent] = useState("");

  // Function to handle the search event
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchContent(e.target.value);
    }
  };

  const handleSearchButtonClick = () => {
    setSearchContent(document.getElementById("search").value);
  };
  console.log(searchContent);

  return (
    <header className="py-3 shadow dark:bg-zinc-800 dark:text-white">
      <Container>
        <nav className="flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold font-[Times-Roman]">R.</h1>
            </Link>
          </div>

          <div className="flex items-center flex-1 justify-center">
            <input
              type="text"
              id="search"
              placeholder="Search"
              onKeyDown={(e) => handleSearch(e)}
              className="px-2 py-1 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearchButtonClick}
              className="ml-2 px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <IoIosSearch />
            </button>
          </div>

          <ul
            className={`flex flex-col justify-center items-center gap-4 fixed sm:relative sm:right-0 sm:top-0 md:flex-row ${
              visible ? "right-2" : "-right-36"
            } transition-[right] duration-500 top-14 z-30 dark:bg-zinc-800 dark:text-white p-4 bg-white text-black rounded-lg sm:flex ml-auto sm:visible md:visible lg:visible`}
          >
            {navItems.map((item, index) =>
              item.active ? (
                <li key={index}>
                  <button
                    onClick={() => (navigate(item.path), setVisible(false))}
                    className={`inline-block px-6 py-2 duration-200 hover:bg-blue-200 hover:text-black rounded-full ${
                      location.pathname === item.path ? "bg-blue-400" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <Link to={"my-profile"}>
                <img
                  src="/boy.jpg"
                  className={`w-10 h-10 rounded-full ${
                    location.pathname === "/my-profile"
                      ? "bg-blue-400 p-1 object-cover"
                      : ""
                  }`}
                  width={48}
                  height={48}
                  alt=""
                />
              </Link>
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <div className="flex items-center justify-center gap-2">
            <div className="cursor-pointer" onClick={handleTheme}>
              {/* Add the dark mode icon */}
              {dark === "light" ? (
                <span className="text-2xl">🌞</span>
              ) : (
                <span className="text-2xl">🌙</span>
              )}
            </div>
            <div className="sm:hidden" onClick={() => setVisible(!visible)}>
              {visible ? (
                <RxCross2 className="text-3xl" />
              ) : (
                <IoMenu className="text-3xl" />
              )}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
