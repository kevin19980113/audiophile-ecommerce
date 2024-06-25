export default function Gallery({
  gallery,
}: {
  gallery: {
    [key: string]: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-3 mt-12 sm:max-h-[500px] lg:max-h-[600px]">
      {Object.keys(gallery).map((key, index) => (
        <img
          key={key}
          src={gallery[key].desktop}
          alt={key}
          className={`rounded-md w-full h-full sm:col-start-${
            index / 2 === 1 ? 2 : 1
          } sm:row-start-${(index + 1) % 2 === 1 ? 1 : 2} 
          ${index === 1 ? "sm:row-span-2" : ""}`}
          loading="lazy"
        />
      ))}
    </div>
  );
}
