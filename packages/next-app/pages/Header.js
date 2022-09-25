import Head from "next/head"

function Header() {
    return (
        <Head>
            <title>SOBR</title>
            <meta
                name="description"
                content="A Web3 Sobriety Maintenance Platform"
            />
            <link rel="icon" href="/favicon.ico" />
            <meta
                property="og:title"
                content="SOBR - A Web3 Sobriety Maintenance Platform"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://sobrflow.x/" />
            <meta
                property="og:site_name"
                content="SOBR - A Web3 Sobriety Maintenance Platform"
            ></meta>
            <meta
                property="og:description"
                content="SOBR - A Web3 Sobriety Maintenance Platform"
            />
        </Head>
    )
}

export default Header
