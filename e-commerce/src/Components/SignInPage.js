
import {useEffect, useState} from 'react'
import './SignIn.css'
import { object, string, number, date, InferType } from 'yup';
import {SignUpApiCall} from '../ApiCalls'

let userSchema = object({
    name: string().min(2).max(50).required(),
    email: string().email().required(),
    password : string().min(8).max(15).required(),
    confirmPassword : string().min(8).max(15).required().test('confirm-password', 'password not matching', function(confirmPassword){
        return confirmPassword === this.parent.password
    }),
    
  }); 

export const SignInPage = () => {

    
   const [values,setValues] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
   })

   const [errors,setErrors] = useState([])

    
    const handleChange = (key,value) => {
        setValues({

        ...values,
        [key] : value
            
       })
    }
    
    const handleSubmit = () => {
        //console.log(values)

        userSchema.validate(values , {abortEarly : false})
        .then((response) => {
            setErrors([])
            console.log(response) 

            SignUpApiCall({
                name : values.name,
                email : values.email,
                password : values.password
            }).then((response) => {
                if(response.data.success){
                    window.location.href = "/login"
                }
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            setErrors(error.errors)
            console.log(error.errors)
        })
    }


    return (
        <div className="login-container"> 


          <div className='formStyle'> 

            < div className='form-cont'>

                <div className='formBox'>
                    <label className='nameStyle'>Name</label>
                    <input  className='inputStyle'
                     value={values.name}
                     onChange = {(event) => { 
                        const val = (event.target.value)
                        handleChange("name", val)
                     }}
                     type="text"/> 
                </div>

            <div className='formBox'>
                <label className='nameStyle'>Email</label>
                <input className='inputStyle' 
                placeholder='Enter your mail'
                 value = {values.email}
                 onChange= {(event) => {
                  const val = (event.target.value)
                  handleChange("email", val)
                 }}
                 type="email"/> 
            </div>

            <div className='formBox'>
                <label className='nameStyle'>Password</label>
                <input  className='inputStyle' 
                 placeholder='Enter your password'
                 value = {values.password}
                 onChange = {(event) => {
                     const  val = (event.target.value)
                    handleChange("password",val)
                 }}
                 type="password"/> 
            </div>

            <div className='formBox'>
                <label className='nameStyle'>ConfirmPassword</label>
                <input className='inputStyle' 
                 value = {values.confirmPassword}
                 onChange = {(event) => {
                  const val =(event.target.value)
                  handleChange("confirmPassword", val)
                 }}
                 type="password"/> 
            </div>
              
              {
                errors.map((err , index) => {
                    return <p key = {index} className='text-danger'>{err}</p>
                })
              }
            <button className='btn btn-primary' type='submit' onClick = {handleSubmit}>Submit</button>

            <p className='paragraph'>Already have a Account <a href='./login'>login here</a> </p>
            </div>

          </div>

        </div>
    )
}