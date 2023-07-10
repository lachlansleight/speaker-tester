import SpeakerTester from "components/SpeakerTester";
import Layout from "components/layout/Layout";

const HomePage = (): JSX.Element => {
    return (
        <Layout>
            <SpeakerTester />
        </Layout>
    );
};

export default HomePage;

/*
//Leaving this here so that I don't have to keep looking up the syntax...
import { GetServerSidePropsContext } from "next/types";
export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: any }> {
    return {
        props: {  },
    };
}
*/
