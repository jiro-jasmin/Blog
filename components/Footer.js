import Link from "next/link";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

function Footer() {
    return (
        <footer>
            <Link
                href="https://github.com/jiro-jasmin"
                target="_blank" 
                aria-label="GitHub profile"
                title="Github"
                tabIndex="0" >
                <GithubIcon />
            </Link>
            &nbsp;
            <Link
                href="https://www.linkedin.com/in/florian-j-giraud-8449091b8/"
                target="_blank"
                title="LinkedIn"
                aria-label="LinkedIn profile"
                tabIndex="0" >
                <LinkedinIcon />
            </Link>
            <div>jiro jasmin / 2023</div>
        </footer>
    );
}

export default Footer;