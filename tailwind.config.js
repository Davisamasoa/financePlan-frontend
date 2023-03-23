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
				bgColor: "#332A36",
				primaryColor: "#F9D307",
				secondaryColor: "#46384E",
				textColor: "#D8C7DF",
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
