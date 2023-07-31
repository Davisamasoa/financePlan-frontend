/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				bgColor: "#15131d",
				primaryColor: "#59E881",
				secondaryColor: "#2c293a",
				textColor: "#DDDAE8",
				redColor: "#E34242",
				greenColor: "#36E767",
			},
		},
		fontFamily: {
			Inter: ["Inter", "sans-serif"],
		},
	},
	plugins: [],
};
