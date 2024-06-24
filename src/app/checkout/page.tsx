import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import GoBackButton from "../components/GoBackButton";
import CheckoutForm from "../components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <MaxWidthWrapper className="px-8 lg:px-32 flex flex-col">
      <Navbar />

      <div className="absolute inset-0 bg-black h-[170px] md:h-[250px] -z-10 max-w-screen-2xl mx-auto"></div>

      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        CHECK OUT
      </div>

      <GoBackButton />

      <CheckoutForm />
    </MaxWidthWrapper>
  );
}
