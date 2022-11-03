import { getStoredCart } from "../utilities/fakedb"

export const productsAndCart = async() =>{
    const productsData = await fetch('http://localhost:5000/products')
    const {allProducts} = await productsData.json()
    const savedCart = getStoredCart()
    // console.log(savedCart)
    const existCart = []
    for(const id in savedCart){
        const addedProduct = allProducts.find((product) => product._id === id)
        const quantity = savedCart[id]
        addedProduct.quantity = quantity
        existCart.push(addedProduct)
    }
    return {allProducts, existCart}
}