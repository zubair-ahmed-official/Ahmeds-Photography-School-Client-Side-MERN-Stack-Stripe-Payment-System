
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'

function App() {

  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer></Footer>
    </>

  )
}

export default App
