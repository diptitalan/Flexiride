import Header from '../components/header-component/Header';
import Footer from '../components/footer-component/Footer';
import { Outlet } from 'react-router';
function AppLayout() {
  return (
    <>
        <Header />
        <Outlet/>
        <Footer/>
    </>
  )
}

export default AppLayout;