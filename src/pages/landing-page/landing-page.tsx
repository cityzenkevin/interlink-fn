import NavBar from "../../sections/landing-page/nav-bar";
import coverImg from "../../assets/cover-bg.jpg";
import Footer from "../../sections/landing-page/footer";
import InternshipCard from "../../sections/landing-page/internship-card";
// import CompanyCard from "../../sections/landing-page/company-card";

export default function LandingPage() {
  return (
    <div className="antialiased bg-white font-sans text-gray-900">
      <main className="w-full">
        {/* start header*/}
        <NavBar />
        {/* end header*/}

        {/* start hero*/}
        <div className="bg-gray-100">
          <section
            className="cover bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
      items-center min-h-screen"
          >
            <div className="h-full absolute top-0 left-0 z-0">
              <img
                src={coverImg}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            <div className="lg:w-3/4 xl:w-2/4 relative z-10 h-100 lg:mt-16">
              <div>
                <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                Embark on a transformative journey toward a brighter future
                </h1>
                <p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">
                Embark on a transformative journey toward a brighter future
                </p>
                <a
                  href="#"
                  className="px-8 py-4 bg-primary text-white rounded inline-block mt-8 font-semibold"
                >
                  Get Started
                </a>
              </div>
            </div>
          </section>
        </div>
        {/* end hero*/}

        {/* start about*/}
        <section id="about" className="relative px-4 py-16 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 lg:py-32">
          <div className="flex flex-col lg:flex-row lg:-mx-8">
            <div className="w-full lg:w-1/2 lg:px-8">
              <h2 className="text-3xl leading-tight font-bold mt-4">
                Welcome to Intern Link
              </h2>
              <p className="text-lg mt-4 font-semibold">
               Hub for internships 
              </p>
              <p className="mt-2 leading-relaxed">
              Discover boundless opportunities with our dedicated platform designed 
              to seamlessly connect students with enriching internships.
               Navigate your professional journey with confidence as
               we prioritize trust, comfort, and meaningful experiences. 
               Your path to success starts here
              </p>
            </div>

            <div className="w-full lg:w-1/2 lg:px-8 mt-12 lg:mt-0">
              <div className="md:flex">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full"></div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h4 className="text-xl font-bold leading-tight">
                    Everything You Need Under One Roof
                  </h4>
                  <p className="mt-2 leading-relaxed">
                  Access a comprehensive array of services within our cutting-edge platform – 
                  from internship discovery and evaluations to skill-building opportunities and 
                  career guidance. We provide a one-stop solution for students seeking a seamless
                   experience, guiding them through every step of their internship journey.
                  </p>
                </div>
              </div>

              <div className="md:flex mt-8">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full"></div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h4 className="text-xl font-bold leading-tight">
                    Our Student-Focused Approach
                  </h4>
                  <p className="mt-2 leading-relaxed">
                  Your customized internship plan will align seamlessly with your aspirations,
                   preferences, and objectives. Whether you're new to the internship scene or 
                   looking to enhance your skills, our user-friendly platform, supportive team,
                    and constructive opportunities will ensure you feel at ease throughout your
                     professional journey
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <section className="mt-12">
            <div className="">
              <h2 className="text-3xl leading-tight font-bold">Internships</h2>
              <p className="text-gray-600 mt-2 md:max-w-lg">
                Latest internships
              </p>

              <a
                href="#"
                title=""
                className="inline-block text-primary font-semibold mt-6 mt:md-0"
              >
                View All Internships
              </a>
            </div>

            <div className="md:flex md:flex-wrap mt-6 text-center md:-mx-4">
              {[1, 2, 3, 4].map(() => (
                <CompanyCard />
              ))}
            </div>
          </section> */}
        </section>
        {/* end about*/}

        {/* start blog*/}
        <section id="internships" className="relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 pb-8">
          <div className="">
            <h2 className="text-3xl leading-tight font-bold">Internships</h2>
            <p className="text-gray-600 mt-2 md:max-w-lg">Latest internships</p>

            <a
              href="#"
              title=""
              className="inline-block text-primary font-semibold mt-6 mt:md-0"
            >
              View All Internships
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3].map(() => (
              <InternshipCard />
            ))}
          </div>
        </section>
        {/* end blog*/}

        {/* start footer*/}
        <Footer />
        {/* end footer*/}
      </main>
    </div>
  );
}
