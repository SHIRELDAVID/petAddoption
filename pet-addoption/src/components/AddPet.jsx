import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddPet.css";
function AddPet({ setIsOpen, options }) {

  const isUpdate = options.updateId

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      JSON.parse(localStorage.getItem("user")).role != 2
    ) {
      window.location.href = "/";
    }
  }, []);

  const [feedback, setFeedback] = useState({
    color: "green",
    content: "",
  });

  const [formData, setFormData] = useState({ ...options?.pet });

  const handleFormChange = (e) => {
    console.log({ [e.target.name]: e.target.value })

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleAddPet = async () => {
    try {
      let imageData = new FormData();
      let imageFile = document.querySelector("#file");
      imageData.append("image", imageFile.files[0]);
      const res = await axios.post(
        "http://localhost:8080/uploadPic",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setFormData({ ...formData, image: `${res.data}` })
    } catch (err) {
      console.log(err);
      if (!isUpdate)
        return setFeedback({
          color: "red",
          content: "error uploading image.",
        });
    }
    try {
      console.log(formData);
      const secondRes = await axios.post(
        !options.updateId ? "http://localhost:8080/pet/create" : "http://localhost:8080/pet/updatePet/" + options.updateId,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setFeedback({
        color: "green",
        content: `pet ${isUpdate ? "updated" : "added"} successfully.`,
      });
    } catch (err) {
      setFeedback({
        color: "red",
        content: err.response.data?.message,
      });
    }
  };

  return (
    <div className="login__card">
      <span onClick={() => setIsOpen(false)}>x</span>
      <div className="card__top">
        <h2>Add pet</h2>
      </div>
      <div className="card__content">
        <select
          className="searchContainer__filter"
          name="status"
          onChange={(e) => handleFormChange(e)}
          value={formData.status}
        >
          <option disabled hidden value="">
            status
          </option>
          <option value="adopted">adopted</option>
          <option value="fostered">fostered</option>
          <option value="available">available</option>
        </select>
        <input
          className="card__input"
          name="name"
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="name"
          required
          value={formData.name}

        />
        <input
          className="card__input"
          name="type"
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="type"
          required
          value={formData.type}

        />

        <input
          className="card__input"
          name="breed"
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="breed"
          required
          value={formData.breed}

        />
        <input
          className="card__input"
          name="age"
          onChange={(e) => handleFormChange(e)}
          type="number"
          placeholder="age"
          required
          value={formData.age}

        />
        <input
          className="card__input"
          name="height"
          onChange={(e) => handleFormChange(e)}
          type="number"
          placeholder="height"
          required
          value={formData.height}

        />
        <input
          className="card__input"
          name="weight"
          onChange={(e) => handleFormChange(e)}
          type="number"
          placeholder="weight"
          required
          value={formData.weight}

        />
        <input
          className="card__input"
          name="color"
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="color"
          required
          value={formData.color}

        />
        <input
          className="card__input"
          name="dietaryRestrictions"
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="Dietary restrictions"
          required
          value={formData.dietaryRestrictions}

        />
        <input
          className="card__input"
          name="bio"
          onChange={(e) => handleFormChange(e)}
          type="text"
          placeholder="bio"
          required
          value={formData.bio}

        />
        <input
          className="card__input"
          name="image"
          type="file"
          id="file"
          placeholder="image"
          required={!isUpdate}

        />
        <div className="hypoallergenicContainer">
          <label class="switch">
            <input
              type="checkbox"
              value={formData.hypoallergenic}

              name="hypoallergenic"
              onChange={(e) =>
                setFormData({ ...formData, hypoallergenic: e.target.checked })
              }
            />
            <span class="slider round"></span>
          </label>
          <small>Hypoallergenic? </small>
        </div>
        <button className="card__btn" onClick={() => handleAddPet()}>
          {isUpdate ? 'Update' : 'Add'} Pet
        </button>
      </div>
      <p style={{ color: feedback.color }} className="card__feedback">
        {feedback.content}
      </p>
    </div>
  );
}

export default AddPet;
