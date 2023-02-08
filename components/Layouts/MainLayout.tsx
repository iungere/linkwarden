import Head from "next/head";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Loader from "../Loader";
import useRedirection from "@/hooks/useRedirection";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { status } = useSession();
  const router = useRouter();

  const redirection = useRedirection();

  const routeExists = router.route === "/_error" ? false : true;

  if (status === "authenticated" && !redirection && routeExists)
    return (
      <>
        <Head>
          <title>Linkwarden</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex">
          <Sidebar />
          <div className="ml-80">
            <Navbar />
            {children}
          </div>
        </div>
      </>
    );
  else if ((status === "unauthenticated" && !redirection) || !routeExists)
    return (
      <>
        <Head>
          <title>Linkwarden</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </>
    );
  else return <Loader />;
}
