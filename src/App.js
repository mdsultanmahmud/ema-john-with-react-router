import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from './layout/Main.jsx'
import About from './components/About/About';
import Shop from './components/Shop/Shop'
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import { productsAndCart } from './data/productsAndCartLoader';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Shipping from './components/Shipping/Shipping';
import SecretRoute from './privateRoute/SecretRoute';
function App() {
const router = createBrowserRouter([
  {
    path:'/',
    element: <Main></Main>,
    children:[
      {
        path:'/',
        loader: () =>fetch('products.json'),
        element: <Shop></Shop>
      },
      {
        path:'/order',
        loader: () => productsAndCart(),
        element:<SecretRoute><Order></Order></SecretRoute>
      },
      {
        path:'/inventory',
        element:<SecretRoute><Inventory></Inventory></SecretRoute>
      },
      {
        path:'/about',
        element:<About></About>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/shipping',
        element:<SecretRoute><Shipping></Shipping></SecretRoute>
      }

    ]
  }
])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
