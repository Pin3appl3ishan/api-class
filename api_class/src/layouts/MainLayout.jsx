import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import Header from './Header'

const MainLayout = () => {
  return (
    <div >
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout

// outlet - dynamically render the child routes