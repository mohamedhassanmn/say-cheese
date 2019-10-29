import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.css'

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide._id.$oid === movie._id.$oid;
      // console.log(movie)
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
          <img src={movie.media_link} onClick={() => onSelectSlide(movie)} alt="" />
          {isActive && <Mark image={movie.media_link} />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
