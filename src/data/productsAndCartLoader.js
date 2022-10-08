import { getStoredCart } from "../utilities/fakedb"

export const productsAndCart = async() =>{
    const productsData = await fetch('products.json')
    const products = await productsData.json()
    const savedCart = getStoredCart()
    // console.log(savedCart)
    const existCart = []
    for(const id in savedCart){
        const addedProduct = products.find((product) => product.id === id)
        const quantity = savedCart[id]
        addedProduct.quantity = quantity
        existCart.push(addedProduct)
    }
    return {products, existCart}
}