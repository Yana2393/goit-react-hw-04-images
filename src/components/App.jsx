import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getImages from './services/getImages';

export const App = () => {
      const [query, setQuery] = useState('');
      const [page, setPage] = useState(1);
      const [photos, setPhotos] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
      const [largeImage, setLargeImage] = useState(undefined);
      const [showBtn, setShowBtn] = useState(false);
      const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
      if (!query || !page) return;
      setLoading(true);

      

      getImages(query, page)
        .then(({ hits: photos, totalHits: total_results }) => {
          if (!photos.length) {
            setIsEmpty(true);
            setShowBtn(false);
            alert('Bad request');
            return;
          }

          setPhotos(prevPhotos => [...prevPhotos, ...photos]);
          setShowBtn(page < Math.ceil(total_results / 15));
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [query, page, error, isEmpty]);

    const onSubmit = query => {
      if (setQuery === query) {
        alert('Already shown');
        return;
      }
      setQuery(query);
      setPage(1);
      setPhotos([]);
      setShowBtn(false);
      setIsEmpty(false);
      setError('');
      setLoading(true);
    };

    const handleClick = () => {
      setPage(prevPage => prevPage + 1);
    };

    const handleImageClick = largeImage => {
      setLargeImage(largeImage);
    };

    const handleClose = () => {
      setLargeImage(undefined);
    };

    return (
      <div>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery>
          {photos.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              handleImageClick={handleImageClick}
            />
          ))}
        </ImageGallery>
        {largeImage && <Modal largeImage={largeImage} modalClose={handleClose} />}
        {loading && <Loader />}
        {showBtn && <Button handleClick={handleClick} />}
      </div>
    );
};