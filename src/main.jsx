import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUp from './SignUp/SignUp.jsx';
import Login from './Login/Login.jsx';
import Home from './Home/Home.jsx';
import Instructors from './Instructors/Instructors.jsx';
import AllUSers from './AllUsers/AllUSers.jsx';
import AddClass from './AddClass/AddClass.jsx';
import DashBoard from './DashBoard/DashBoard.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx';
import MyClass from './MyClass/MyClass.jsx';
import AllClasses from './AllClasses/AllClasses.jsx';
import ManageClass from './ManageClass/ManageClass.jsx';
import MySelectedClass from './MySelectedClass/MySelectedClass.jsx';
import NotFound from './NotFound/NotFound.jsx';
import MyEnrolledClass from './MyEnrolledClass.jsx/MyEnrolledClass.jsx';
import Payment from './Payment/Payment.jsx';
import PaymentHistory from './PaymentHistory/PaymentHistory.jsx';
import AdminRoutes from './Routes/AdminRoutes.jsx';
import InstructorRoutes from './Routes/InstructorRoutes.jsx';
import StudentRoutes from './Routes/StudentRoutes.jsx';
import UpdateClass from './UpdateClass/UpdateClass.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App></App>,
  children: [
    {
      path:'/',
      element:<Home/>
    },
    {
      path: '/SignUp',
      element: <SignUp></SignUp>
    },
    {
      path:'/Login',
      element:<Login></Login>
    },
    {
      path: '/Instructors',
      element: <Instructors></Instructors>
    },
    {
      path: '/AllClasses',
      element: <AllClasses></AllClasses>
    },
    
    {
      path:'/Dashboard',
      element:<PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
      children: [
        {
          path:'/Dashboard/AddClass',
          element:<InstructorRoutes><AddClass></AddClass></InstructorRoutes>
        },
        {
          path:`/Dashboard/UpdateClass/:id`,
          element:<InstructorRoutes><UpdateClass></UpdateClass></InstructorRoutes>,
          loader: ({params})=> fetch(`https://12th-assignment-server-side.vercel.app/class/${params.id}`)
        },
        {
          path:'/Dashboard/AllUsers',
          element:<AdminRoutes><AllUSers></AllUSers></AdminRoutes>
        },
        {
          path:'/Dashboard/MyClass',
          element:<InstructorRoutes><MyClass></MyClass></InstructorRoutes>
        },
        {
          path:'/Dashboard/ManageClass',
          element:<AdminRoutes><ManageClass></ManageClass></AdminRoutes>
        },
        {
          path:'/Dashboard/MySelectedClass',
          element:<PrivateRoutes><MySelectedClass></MySelectedClass></PrivateRoutes>
        },
        {
          path:'/Dashboard/MyEnrolledClass',
          element:<PrivateRoutes><MyEnrolledClass></MyEnrolledClass></PrivateRoutes>
        },
        {
          path:'/Dashboard/Pay/:id',
          element:<PrivateRoutes><Payment></Payment></PrivateRoutes>,
          loader: ({params})=> fetch(`https://12th-assignment-server-side.vercel.app/selectClass/${params.id}`)
        },
        {
          path:'/Dashboard/PaymentHistory',
          element:<StudentRoutes><PaymentHistory/></StudentRoutes>
        },
      ]
    },
  ]
},
{
  path: '*',
  element:<NotFound></NotFound>
}

]);
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
