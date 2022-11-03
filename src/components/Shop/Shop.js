import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

/**
 * pagination purpose:
 * 1. Count : done
 * 2. per page: (how many data loads)
 * 3. page:
 */

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [allProducts, SetAllProducts] = useState([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    useEffect(() => {
        const url = `http://localhost:5000/products?page=${currentPage}&size=${pageSize}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                SetAllProducts(data.allProducts)
            })
    }, [currentPage, pageSize])
    const pages = Math.ceil(count / pageSize)
    const clearCart = () => {
        const agreed = prompt('For deleting all items please type confirm')
        if (agreed === 'confirm') {
            setCart([])
            deleteShoppingCart()
        }
    }


    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const cartProId = Object.keys(storedCart)
        fetch('http://localhost:5000/productsWithId', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartProId)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })


    }, [allProducts])



    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    allProducts.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link style={{ textDecoration: 'none' }} to={'/order'}>Review Order</Link>
                </Cart>
            </div>
            <div className='pagination'>
                <h3>currnet page : {currentPage}</h3>
                {
                    [...Array(pages).keys()].map(number => <button
                        style={{ padding: '1rem', width: '30px' }}
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number + 1}
                    </button>)
                }
                <select defaultValue={'10'} onChange={e => setPageSize(e.target.value)} style={{ padding: '1rem', width: '30px' }}>
                    <option value="5">5</option>
                    <option value="10" >10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>

            </div>
        </div>
    );
};

export default Shop;