import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper className="px-8 lg:px-32 flex flex-col">
      <Navbar />
      {children}
    </MaxWidthWrapper>
  );
}
