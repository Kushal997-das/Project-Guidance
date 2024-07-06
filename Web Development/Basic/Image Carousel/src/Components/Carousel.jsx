import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [images]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const allowedExtensions = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];

    const validateAndAddImages = () => {
      const newImages = [];

      for (let file of files) {
        if (!allowedExtensions.includes(file.type)) {
          setErrorMessage(
            "Invalid Format! Please add images in JPG, JPEG, PNG, or GIF format."
          );
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }

      setErrorMessage(""); // Clear previous error message
    };

    validateAndAddImages();
  };

  const handleImageSelect = (index) => {
    setSelectedImages((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.has(index)
        ? newSelected.delete(index)
        : newSelected.add(index);
      return newSelected;
    });
  };

  const handleRemoveSelected = () => {
    if (selectedImages.size === images.length) {
      const confirmRemove = window.confirm(
        "Are you sure you want to remove all images? This action cannot be undone."
      );

      if (confirmRemove) {
        setImages([]);
        setSelectedImages(new Set());
        setCurrentIndex(0);
      }
    } else {
      setImages((prevImages) =>
        prevImages.filter((_, index) => !selectedImages.has(index))
      );
      setSelectedImages(new Set());
      setCurrentIndex(0);
    }
  };

  const goToNext = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

  const goToPrev = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );

  return (
    <div className="carousel-container">
      {images.length === 0 ? (
        <div className="file-input-wrapper">
          <label className="file-label" htmlFor="file-input">
            Add Photos
          </label>
          <input
            type="file"
            id="file-input"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <>
          <div className="carousel">
            <div
              className="carousel-inner"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  className={`carousel-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="carousel-image"
                  />
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={selectedImages.has(index)}
                      onChange={() => handleImageSelect(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control prev" onClick={goToPrev}>
              &#10094;
            </button>
            <button className="carousel-control next" onClick={goToNext}>
              &#10095;
            </button>
          </div>
          <div className="controls">
            <div className="file-input-wrapper-below">
              <label className="file-label" htmlFor="file-input-below">
                Add Photos
              </label>
              <input
                type="file"
                id="file-input-below"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            <button
              className={`remove-button ${
                selectedImages.size > 0 ? "active" : "inactive"
              }`}
              onClick={handleRemoveSelected}
              disabled={selectedImages.size === 0}
            >
              Remove Photos
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
