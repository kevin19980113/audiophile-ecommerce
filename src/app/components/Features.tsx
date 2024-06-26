type FeaturesProps = {
  features: string;
  includes: {
    quantity: number;
    item: string;
  }[];
};

export default function Features({ features, includes }: FeaturesProps) {
  const featureList = features.split(".");

  return (
    <div className="w-full flex flex-col items-center lg:flex-row lg:justify-start lg:items-start">
      <div className="w-full flex flex-col items-start lg:w-2/3">
        <h1 className="text-lg font-bold">FEATURES</h1>
        {featureList.map((feature) => (
          <p
            className="text-base text-muted-foreground font-medium mt-2 lg:mr-16"
            key={feature}
          >
            {feature}
          </p>
        ))}
      </div>

      <div className="w-full flex flex-col items-start mt-12 md:flex-row lg:flex-col lg:mt-0 lg:w-1/3">
        <h1 className="text-lg font-bold md:w-1/2">IN THE BOX</h1>
        <div className="flex flex-col md:w-1/2 whitespace-nowrap">
          {includes.map(({ quantity, item }) => (
            <p
              className="text-base text-muted-foreground font-medium max-w-prose mt-2"
              key={`${item}-${quantity}`}
            >
              <span className="text-orange-500 font-semibold mr-6">
                {quantity}x
              </span>{" "}
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
