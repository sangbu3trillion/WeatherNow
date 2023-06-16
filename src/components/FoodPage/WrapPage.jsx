import React from 'react';
import FoodMap from './FoodMap';
import FoodContent from './FoodContent';

const WrapPage = () => {
    return (
        <div className="w-4/6 m-auto mt-14">
            <FoodMap />
            <FoodContent />
        </div>
    );
};

export default WrapPage;
