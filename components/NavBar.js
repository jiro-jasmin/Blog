import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

function NavBar() {


    return (
        <nav className="navBar container">
            <Link
                href="/"
                className="title"
                title="Homepage"
                tabIndex="0">
                JIRO JASMIN / BLOG
            </Link>

            <ul>
                <li>
                    <ThemeToggle />
                </li>
                <li>
                    <Link
                        href="/posts"
                        tabIndex="0" >
                        All posts
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;