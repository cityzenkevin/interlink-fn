import "../App.css";
import Footer from "../components/Footer";
import HomepageComponent from "../components/Homepage";
import NavBar from "../components/NavBar";
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
