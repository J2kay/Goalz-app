// Profile.js
import React, { useState } from "react";
import "../styles/ppic.css";

const Profile = ({ onFileSelect, onUploadButtonClick }) => {
  const [previewImage, setPreviewImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" // Replace with your default image URL
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Update the preview image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Call the external file select handler
    onFileSelect(file);
  };

  return (
    <>
      <div id="imageUploadContainer">
        <label htmlFor="uploadInput" id="chooseImageButton">
          <img src={previewImage} alt="Preview" />
          <input type="file" id="uploadInput" onChange={handleFileChange} />
        </label>
      </div>
    </>
  );
};

export default Profile;
