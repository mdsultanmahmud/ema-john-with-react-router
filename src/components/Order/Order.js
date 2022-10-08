import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart } from '../../utilities/fakedb';
const Order = () => {
    const { products, existCart } = useLoaderData()
    const [cart, setCart] = useState(existCart)
    const deleteProduct = (id) =>{
        const remainingProduct = cart.filter(product => product.id !== id)
       setCart(remainingProduct)
       removeFromDb(id)
    }

    const clearCart = () =>{
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItem 
                        key={product.id} 
                        product = {product}
                        deleteProduct = {deleteProduct}
                        ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h3>No items for review. Please  <Link to={'/'}>shop more</Link> </h3>
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Order;