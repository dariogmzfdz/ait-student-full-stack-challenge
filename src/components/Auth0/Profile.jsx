import React, { useState } from "react";
import { LogoutButton } from "../Auth0/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Close } from "@mui/icons-material";
import { useQuery } from "react-query";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

    const { isLoading: isDataLoading, error } = useQuery("userData", () =>
    fetch(`http://localhost:4000/userPosts`)
        .then((res) => res.json())
        .then((res) => setData(res))
    );

    console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && (
        <div onClick={() => setOpen(true)}>
          <img className="rounded-full ml-12 w-20 h-20 cursor-pointer" src={user.picture} alt={user.name} />
        </div>
      )}
      {open && (
        <section className="flex justify-center items-center fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm">
          <section className="w-64 mx-auto bg-[#1f2029] border-2 border-emerald-400 rounded-2xl px-8 py-6 shadow-lg z-20">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </span>
              <span
                className="text-emerald-400 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <Close />
              </span>
            </div>
            <div className="mt-6 w-fit mx-auto">
              <img
                src={user.picture}
                className="rounded-full w-28 "
                alt="profile picture"
                srcSet=""
              />
            </div>
            <div className="mt-8 ">
              <h2 className="text-white font-bold text-2xl tracking-wide">
                {user.name}
              </h2>
            </div>
            <div className="flex justify-between items-center">
                <p class="text-emerald-400 font-semibold mt-2.5">
                  {data.length} Gifs
                </p>
                <LogoutButton />
            </div>
          </section>
        </section>
      )}
    </>
  );
};
