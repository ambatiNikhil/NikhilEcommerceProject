import axios from 'axios' 

export const SignUpApiCall = (data) => {
     const {name,email,password} = data
    return (
        axios({
            url : "http://18.183.45.219:3000/api/v1/users/register",
            method : "POST",
            data : {
                "name" : name,
                "email" : email,
                "password" : password,
            }
        })
    )
}

export const loginApiCall = (data) => {
    const {email,password} = data

    return axios({
        method  : "POST",
        url : "http://18.183.45.219:3000/api/v1/users/login",
        data : {
            "email" : email,
            "password" : password
        }
        
    })
}

export const LoadProducts = async () => { 
    const token = localStorage.getItem('aToken')


    return axios ({
        method : "GET",
        url : "http://18.183.45.219:3000/api/v1/products",
        headers : {
            "X-Authorization" : `Bearer ${token}`
        }

    });

}

export const addProductToTheCart = async (cartId,productId) => { 
    const token = localStorage.getItem('aToken')
     
    return axios({
        method : "POST",
        url : `http://18.183.45.219:3000/api/v1/carts/${cartId}`,
        headers : {
            "X-Authorization" : `Bearer ${token}`
        },
        data : {
            id : productId
        }
    })
}

export const deleteProductInCart = async (cartId,productId) => {

    const token = localStorage.getItem('aToken')

    return axios({
        method : "DELETE",
        url : `http://18.183.45.219:3000/api/v1/carts/${cartId}/remove/${productId}`,
        headers : {
            "X-Authorization" : `Bearer ${token}`
        },
        params : {
            id : `${productId}`,
        }
    })

}