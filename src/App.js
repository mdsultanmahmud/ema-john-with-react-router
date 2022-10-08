import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from './layout/Main.jsx'
import About from './components/About/About';
import Shop from './components/Shop/Shop'
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import { productsAndCart } from './data/productsAndCartLoader';
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
        element:<Order></Order>
      },
      {
        path:'/inventory',
        element:<Inventory></Inventory>
      },
      {
        path:'/about',
        element:<About></About>
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
