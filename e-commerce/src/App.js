import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link , Navigate } from "react-router-dom";
import {LoginPage} from "./Components/LoginPage"
import {SignInPage} from "./Components/SignInPage"
import {ProductFeed} from "./Components/ProductFeed"

function App() {

  const PublicRoute = (props) => {
  const token = localStorage.getItem('aToken')

  if(token){
    return <Navigate to = '/products'/>
  }else{
    return props.children;
  }

  }

  const ProtectedRoute = (props) => {
    const token = localStorage.getItem('aToken')
    if(token){
      return props.children
    }else{
      return <Navigate to = "/login"/>
    }
  }

  

  return (
    <div>
    <Routes>
      <Route path = "/signin" element = {
        <PublicRoute>
          <SignInPage/>
        </PublicRoute>
      }/>
      <Route path = "/login" element = {
       <PublicRoute>
        <LoginPage/>
       </PublicRoute> } />

       
      <Route path = "/products" element = { 
      <ProtectedRoute>
        <ProductFeed/>
      </ProtectedRoute>} />
    </Routes>
    </div>

  )
  
}

export default App;
