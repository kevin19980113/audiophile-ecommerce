import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const isCheckoutRoute = nextUrl.pathname.includes("checkout");
  const isPaySuccessRoute = nextUrl.pathname.includes("success");

  const { isAuthenticated } = getKindeServerSession();

  if (isCheckoutRoute) {
    if (!(await isAuthenticated())) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  // if(isPaySuccessRoute){
  //   //check if pay was successful
  //   if( //not pay was successful ){
  //     return Response.redirect(new URL("/", nextUrl));
  //   }
  // }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
