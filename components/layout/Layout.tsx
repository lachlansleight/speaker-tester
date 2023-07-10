import { ReactNode } from "react";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <>
            <Head>
                <title>Speaker Tester</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen bg-black text-white">{children}</main>
        </>
    );
};

export default Layout;
