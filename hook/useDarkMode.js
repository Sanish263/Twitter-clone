import { useState, useEffect } from "react";

function useDarkMode () {
	const [theme, setTheme] = useState(typeof window !== "undefined" ? localStorage.theme : "light");
	const colorTheme = theme === "dark" ? "light" : "dark";
	
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.add(theme);
		root.classList.remove(colorTheme);
		if (typeof window !== "undefined") {
			localStorage.setItem('theme',theme)
		}
	}, [theme, colorTheme]);  
		return [setTheme, colorTheme, theme]
}

export default useDarkMode;
