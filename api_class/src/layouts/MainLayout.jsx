import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

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