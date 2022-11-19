import Footer from "../Footer";
import Navbar from "../Navbar";

function Layout(props) {
  return (
    <div className="layout">
      <Navbar/>
      <main className='main-container'>{props.children}</main>
      <Footer/>
    </div>
  );
}

export default Layout;
