import React from 'react';

const CampsiteMarker = ({ image, name }) => {
    return (
        <div className="Marker__holder">
            <img src={image} alt="camp location" className="Marker__icon" />
            <p className="Marker__name">{name}</p>
        </div>);
};

export default CampsiteMarker;