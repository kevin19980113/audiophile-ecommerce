import GoBackButton from "../components/GoBackButton";
import CheckoutForm from "../components/CheckoutForm";

export default async function CheckoutPage() {
  return (
    <>
      <div className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        CHECK OUT
      </div>

      <GoBackButton />

      <CheckoutForm />
    </>
  );
}
