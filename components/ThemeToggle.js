import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

function ThemeToggle() {

    // to avoid hydration mismatch (as the theme is first undefined on the server)
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const { systemTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    let currentTheme = theme;

    const toggleTheme = () => {
        if (currentTheme === 'system') {
            currentTheme = systemTheme;
        }
        if (currentTheme === 'light') {
            setTheme('dark');

        } else {
            setTheme('light');
        }
    }

    return (
        <>
            <input type="checkbox" className="checkbox" id="checkbox" onChange={toggleTheme} />
            <label htmlFor="checkbox" className="label" title="Switch to dark/light mode">
                <i className='fas fa-sun'><SunIcon /></i>
                <i className="fas fa-moon"><MoonIcon /></i>
                <div className='ball'></div>
            </label>
        </>
    );
}

export default ThemeToggle;