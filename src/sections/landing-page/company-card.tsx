export default function CompanyCard() {
  return (
    <div className="md:w-1/2 md:px-4 lg:w-1/4">
      <div className="bg-white rounded-lg border border-gray-300 p-8">
        <img src="images/teeth-whitening.svg" alt="" className="h-20 mx-auto" />

        <h4 className="text-xl font-bold mt-4">Teeth Whitening</h4>
        <p className="mt-1">Let us show you how our experience.</p>
        <a href="#" className="block mt-4">
          Read More
        </a>
      </div>
    </div>
  );
}
