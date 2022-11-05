import React from "react";
import classNames from "classnames";
import { AiFillHeart } from "react-icons/ai";
import styles from "../../styles/Card.module.css";

const Card = ({ id, title, isLiked, order, image, toggleFavorite }) => {
  const [isFavorite, setIsFavorite] = React.useState(isLiked);

  const handleFavorite = (id) => {
    setIsFavorite(!isFavorite);
    toggleFavorite(id);
  };

  // go to url of the image clicking the card
  const goToUrl = () => {
    window.open(image, "_blank");
  };


  return (
    <div className={classNames([styles.wrapper, styles.wrapperAnime])}>
      <div className={styles.header}>
        <div className={styles.imageWrapper} onClick={goToUrl}>
          <img src={image} className={styles.image} alt="" />
        </div>
        <div className={styles.badgeWrapper}>
          <div
            className={classNames([
              isFavorite ? styles.favBtnActive : styles.favBtn
            ])}
            onClick={() => handleFavorite(id)}
          >
            <AiFillHeart />
          </div>
        </div>
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.text}>{`${order}. ${title}`}</h1>
      </div>
    </div>
  );
};

export default Card;
