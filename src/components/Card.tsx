interface Card {
  title: string;
  subtitle?: string;
  link?: string;
  description: string;
  customClass?: string;
}

export default function Card({
  title,
  subtitle,
  link,
  description,
  customClass,
}: Card) {
  return (
    <div
      className={`block shadow-md  md:max-w-[20rem] md:min-w-[13rem] mt-2 border-2 border-gray-200 rounded-lg bg-white text-left ${customClass}`}
    >
      <div className="p-4">
        <h5 className="mb-1 text-xl font-semibold leading-tight text-primary ">
          {title}
        </h5>

        <p className="mb-4 text-base  leading-normal text-neutral-600 P">
          {description}
        </p>
        <h3 className="mb-1 text-xl font-medium leading-tight text-neutral-800 ">
          {subtitle}
        </h3>
        <a
          type="button"
          href="#"
          className="pointer-events-auto mr-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
        >
          {link}
        </a>
      </div>
    </div>
  );
}
