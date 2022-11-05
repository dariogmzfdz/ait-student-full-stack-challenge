import React from "react";
import styles from "../../styles/HomeHeader.module.css";
import Giphy from "../../assets/giphy-logo.png";
import { Profile } from "../Auth0/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Auth0/Login";

function HomeHeader() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.headerTitle}>House of Gifs</h1>
        <div className={styles.giphyContainer}>
          <h5>Powered by</h5>
          <img className={styles.giphyLogo} src={Giphy} alt="" />
        </div>
      </div>
      {isAuthenticated ? (
        <>
          <Profile />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default HomeHeader;
