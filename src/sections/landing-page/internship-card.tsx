export default function InternshipCard() {
  return (
    <div className="w-full">
      <div className="bg-white rounded border border-gray-300">
        <div className="w-full h-48 overflow-hidden bg-gray-300"></div>
        <div className="p-4">
          <div className="flex items-center text-sm">
            <span className="text-primary font-semibold">Business</span>
            <span className="ml-4 text-gray-600">29 Nov, 2019</span>
          </div>
          <p className="text-lg font-semibold leading-tight mt-4">Card Title</p>
          <p className="text-gray-600 mt-1">
            This card has supporting text below as a natural lead-in to
            additional content.
          </p>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300"></div>
            <div className="ml-4">
              <p className="text-gray-600">
                By{" "}
                <span className="text-gray-900 font-semibold">Abby Sims</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
