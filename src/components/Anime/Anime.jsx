import React, { useState, useEffect } from "react";
import HomeHeader from "../HomeHeader/HomeHeader";
import Menu from "../Menu/Menu";
import Card from "../Card/Card";
import styles from "../../styles/Home.module.css";
import "../../styles/Menu.css";
import { Favorite } from "@mui/icons-material";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import UploadGif from "../UploadGif/UploadGif";
import Loader from "../Loader/Loader";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("all");
  const [favorite, setFavorite] = useState(false);

  // Fetch json server

  const { isLoading, error } = useQuery("repoData", () =>
    fetch("http://localhost:4000/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res))
  );

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const tagger = (e) => {
    setTag(e.target.value);
  };

  const showFavorite = (e) => {
    setFavorite(e.target.checked ? true : false);
  };

  function filter() {
    if (!search && tag === "all" && !favorite) {
      return posts;
    } else if (search && tag === "all") {
      return posts.filter((data) =>
        data.title.toLowerCase().includes(search.toLocaleLowerCase())
      );
    } else if (!search && tag !== "all") {
      return posts.filter((data) => data.tags.includes(tag));
    } else if (favorite) {
      return posts.filter((post) => post.liked === true);
    } else {
      return posts.filter(
        (data) =>
          data.title.toLowerCase().includes(search.toLocaleLowerCase()) &&
          data.tags.includes(tag)
      );
    }
  }
  
  const results = filter();
  
  const toggleFavorite = async (id) => {
      const postId = posts.find((post) => post.id === id);
      
      if (!postId.liked) {
          postId.liked = true;
        } else {
            postId.liked = false;
    }
    
    await fetch(`http://localhost:4000/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postId),
    });
  };
  
  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;
  
  return (
    <>
      <div className="flex flex-row items-center">
        <HomeHeader />
        <div className={styles.searchbarContainer}>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputSearch}
              value={search}
              onChange={searcher}
              type="text"
              placeholder="Search"
            />
          </div>
          <select onChange={tagger} className={styles.categoriesContainer}>
            <option value="all">All tags</option>
            <option value="evangelion">Evangelion</option>
            <option value="op">One Piece</option>
            <option value="steins">Steins;Gate</option>
            <option value="chainsaw">Chainsaw Man</option>
            <option value="db">Dragon Ball</option>
            <option value="jojo">Jojo's</option>
          </select>
        </div>
        <label className="container">
          <input type="checkbox" onChange={showFavorite} />
          <div className="checkmark">
            <Favorite />
          </div>
        </label>
        <div className="ml-12">
          <UploadGif />
        </div>
        <Menu />
      </div>
      <main className={styles.section}>
        <h1 className="not-italic text-3xl font-black leading-[80px] break-normal grid w-screen place-items-center">
          Anime gifs
        </h1>
        <section className={styles.container}>
          <div className={styles.layout}>
            {results.map((element) => (
              <Card
                key={element.id}
                id={element.id}
                title={element.title}
                isLiked={element.liked}
                order={element.id}
                image={element.image}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
