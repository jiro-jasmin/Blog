import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider attribute="class">
        <NavBar />
        <main className="container">
          <Component {...pageProps} />
        </main>
        <Footer />
    </ThemeProvider>
  )
}

export default MyApp;
