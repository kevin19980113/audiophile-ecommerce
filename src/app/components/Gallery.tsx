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
    <div className="grid grid-cols-2 grid-rows-2 gap-3 mt-12 max-h-[550px]">
      {Object.keys(gallery).map((key, index) => (
        <img
          key={key}
          src={gallery[key].desktop}
          alt={key}
          className={`rounded-md w-full h-full col-start-${
            index / 2 === 1 ? 2 : 1
          } row-start-${(index + 1) % 2 === 1 ? 1 : 2} 
          ${index === 2 ? "row-span-2" : ""}`}
        />
      ))}
    </div>
  );
}
