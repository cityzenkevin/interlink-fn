import "../App.css";
import Footer from "../layouts/Footer";
import HomepageComponent from "../components/Homepage";
import NavBar from "../layouts/NavBar"
// import Services from "../components/Services";

function Homepage() {
  return (
    <>
      <NavBar />
      <HomepageComponent />
      {/* <Services /> */}   
      <Footer />
    </>
  );
}

export default Homepage;
