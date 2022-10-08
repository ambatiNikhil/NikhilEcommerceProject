import {useEffect,useState} from 'react'
import { LoadProducts , addProductToTheCart , deleteProductInCart } from '../ApiCalls'
import './ProductFeed.css'

export const ProductFeed = () => {

    const [products,setProducts] = useState([])
    const [productsInCart,setProductsInCart] = useState([])

    const handleLogOut = () => {
        localStorage.removeItem('aToken')
        window.location.href = '/login'
    }

    const fetchTheProducts = async() => {
        try{
            const result = await LoadProducts()
            setProducts(result.data)
            console.log(result)
        }
        catch(error) {
          console.log(error)
        }
    }

    const handleAddToCart = async(productId) => { 

        const cartId = localStorage.getItem("cartId")

        try{
            const response = await addProductToTheCart(cartId,productId)
            if(response.data.success){
                setProductsInCart([...productsInCart, productId])
            }
        }catch(error){
            console.log(error)
        }
        
    }

    const handleRemoveFromCart =  async (productId) => {
       const cartId = localStorage.getItem("cartId") 

       try {
          const response = await deleteProductInCart(cartId,productId)
          if(response.data.success){
            const newFilteredCart = productsInCart.filter((product) => {
                return product !== productId
            })
            setProductsInCart(newFilteredCart)
          }
       }catch(error){
           console.log(error)
       }
       
    }

    useEffect(() =>{
        fetchTheProducts()

    }, [])
     
    return (
        <div className='productPageStyle'>
            <div className='main-heading-cont'>
         <h1 className='first-heading'>Freedom Shop <span>Wellcomes you</span></h1>
           </div>
         <div style={{display : "flex", flexWrap : "wrap" ,justifyContent:"center"}}>
         {products.map((product) =>{
            const {id, title, images = [], price,description, } = product;
            return (
                <div key = {id} className='card-style' style= {{width:300}}>
                <h1 className='product-name' >{product.title}</h1>
                <img src = {images[0]} alt = "not Avalilable" className='image'/>
                <p className='product-description'>{product.description}</p>
                <p className='price-tag'>Price : {price}</p> 

                <div style ={{padding : 10}}>

                { productsInCart.includes(id) ? 
                    <button className='btn btn-warning m-1 '
                    onClick = {() => {
                        handleRemoveFromCart(id)
                    }}>Remove from cart</button>: 

                    <button className='btn btn-primary m-1'
                    onClick = {() => {
                        handleAddToCart(id)
                    }}>Add to card</button> 
                   
                }
                </div>

                
                </div>
            )
         })}
         </div>

         <div className='footer'>
            <h1 className='exit-note'>Thank you for visiting </h1>
         <button className="btn btn-danger" onClick = {handleLogOut}>Log Out</button>
         </div>
        </div>
       
    )
}