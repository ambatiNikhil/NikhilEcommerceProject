import "./login.css"

import {useState} from 'react' 

import { object, string, number, date, InferType } from 'yup'; 
import {loginApiCall} from '../ApiCalls'

let userSchema = object({
    email: string().email().required(),
    password : string().min(8).max(15).required()
  });

export const LoginPage = () => {

    const [errors,setErrors] = useState([])

    const [values,setValues] = useState({
        email : "",
        password : ""
    })
   
    const handleTheChange = (key, value) => {
        setValues({
            ...values,
            [key] : value
        })
    }

    const handleSubmit = async () => {
        userSchema.validate(values, {abortEarly : false})
        .then((response) => {
            setErrors([])
            loginApiCall({
                email : values.email,
                password : values.password
            })
            .then((response) => {
                localStorage.setItem("aToken", response.data.token)
                localStorage.setItem("cartId", response.data.cart_id)
                
                window.location.href = "/products"
            })
            .catch((error) => {
                console.log(error)
            })

            console.log(response)
        })
        .catch((error) =>{
            setErrors(error.errors)
            alert("unable to login")
        })
    }

    return (
        <div className="main-cont">
         <div className="login-cont"> 

         <div className="structure"> 
            <h1 className="form-heading">Login Here</h1>
            <div className="inputs-box">
                <label className="name-style">Email Address</label>
                <input  className="input-style"
                  value = {values.mailId}
                 placeholder = "Enter registerd mail"
                 onChange = {(event) => {
                    const val = (event.target.value)
                    handleTheChange("email", val)
                 }}
                 type="email"/>
            </div>

            <div className="inputs-box">
                <label className="name-style">Password</label>
                <input  className="input-style" 
                 placeholder = "Enter your password" 
                 value = {values.password}
                 onChange = {(event) => {
                    const val = (event.target.value)
                    handleTheChange("password", val)
                 }}
                 type="password"/>
            </div>

            <button className="btn btn-primary" type="submit" onClick = {handleSubmit}>Submit</button> 
            {
                errors.map((error , index) =>{
                    return <p key = {index} className = 'text-danger'>{error}</p>
                })
            }

            <p className="Lparagraph">Dont have a Account Create Now<a href="./signin"> Create Now</a></p>
         </div>

         </div>
        
        </div>
    )
}

