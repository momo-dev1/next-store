import Head from "next/head";
import Navbar from "./Navbar";

export default function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
}
