import React, { useState } from 'react';
import '../css/SliderImageHistory.css';

function SliderImageHistory() {
  const [images, setImages] = useState([
    { id: 1, url: 'https://via.placeholder.com/150' },
    { id: 2, url: 'https://via.placeholder.com/150' },
    { id: 3, url: 'https://via.placeholder.com/150' }
  ]);

  const handleDelete = (id) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
  };

  return (
    <div className="slide-image-history-table-container">
      <h2>Slider Image History</h2>
      <div className="table-responsive">
        <table className="image-table">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={image.id}>
                <td>{index + 1}</td>
                <td><img src={image.url} alt={`Slider ${index + 1}`} className="slider-img" /></td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(image.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SliderImageHistory;
