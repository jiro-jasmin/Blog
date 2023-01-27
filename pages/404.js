import Head from "next/head";
import Link from "next/link";

function PageNotFound() {
    return (
        <>
            <Head>
                <title>Page Not Found | Jiro Jasmin's blog</title>
            </Head>
            <div className="pageNotFound">
                <h1>404<br />Page Not Found</h1>
                <div id="sadEmoji">😢</div>
                <h3>Looks like you're lost.</h3>
                <p>The page you are looking for is not available!</p>
                <button>
                    <Link href="/">Go back to homepage</Link>
                </button>
            </div>
        </>
    );
}

export default PageNotFound;