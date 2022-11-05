import React, { useState } from "react";
import "../../App.css";
import styles from "../../styles/Upload.module.css"

function UploadGif() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [array, setArray] = useState();

  const handleUrlInput = (e) => {
    setUrl(e.target.value);
  };

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleTagsInput = (e) => {
        setTags([e.target.value]);
    }

    const handleUpload = () => {
        setArray({ title: title, image: url, tags: tags });
        console.log(array);
    }

const submitForm = () => {
    fetch("http://localhost:4000/userPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(array),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(tags);

  console.log(array);

  return (
    <>
      <button className="icon-btn add-btn" onClick={(e) => setOpen(true)}>
        <div className="add-icon"></div>
        <div className="btn-txt">Upload Gif</div>
      </button>
      {open && (
        <div className="box">
          <div className="modal-container">
            <div className="modal">
              <h1 className="modal__title">Upload your gif</h1>
              <div className="modal__content">
                <div>
                  <label className={styles.labelForm}>Title</label>
                  <input
                    type="text"
                    id="first_name"
                    className={styles.inputForm}
                    onChange={handleTitleInput}
                    placeholder="Gif title..."
                    required
                  />
                </div>
                <div>
                  <label className={styles.labelForm}>Gif Url</label>
                  <input
                    type="url"
                    id="first_name"
                    className={styles.inputForm}
                    onChange={handleUrlInput}
                    placeholder="Gif url..."
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tags" className={styles.labelForm}>
                    Select an option
                  </label>
                  <select
                    id="tags"
                    className={styles.inputForm}
                    onChange={handleTagsInput}
                  >
                    <option>Add a tag</option>
                    <option value="evangelion">Evangelion</option>
                    <option value="op">One Piece</option>
                    <option value="steins">Steins;Gate</option>
                    <option value="chainsaw">Chainsaw Man</option>
                    <option value="db">Dragon Ball</option>
                    <option value="jojo">Jojo's</option>
                  </select>
                </div>
              </div>
              <div className="modal__footer">
                <button
                  type="button"
                  className={styles.btnForm}
                  onClick={() => handleUpload()}
                >
                  Set data
                </button>
                <button
                  type="button"
                  className={!array ? styles.btnFormDisabled : styles.btnForm}
                  disabled={!array ? true : false}
                  onClick={() => submitForm()}
                >
                  Upload
                </button>
              </div>
              <div className="outer" onClick={() => setOpen(false)}>
                <div className="inner">
                  <label className="label">Close</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadGif;
