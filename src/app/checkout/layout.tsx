import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper className="px-8 lg:px-32 flex flex-col">
      <div className="absolute inset-0 bg-black h-[170px] md:h-[250px] -z-10 max-w-screen-2xl mx-auto"></div>
      <Navbar />
      {children}
    </MaxWidthWrapper>
  );
}
