import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const ReviewItem = ({ product, deleteProduct }) => {
    const { name, price, quantity, img,shipping,_id } = product
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='review-details-container'>
                <div className='review-details'>
                    <p>{name}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <p><strong>Shipping:</strong> ${shipping}</p>
                    <p><strong>Quantity:</strong> {quantity}</p>
                </div>
                <div className='review-btn'>
                    <button onClick={() => deleteProduct(_id)} className='delete-btn'>
                    <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;