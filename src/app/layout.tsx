import "./globals.css";

export const metadata = {
	title: "Finance Plan",
	description: "Quer organizar seus gastos? Chega de planilha, use o financePlan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body className=" bg-bgColor text-textColor max-w-[1300px] min-h-screen pb-24 relative mx-auto px-4">
				{children}
			</body>
		</html>
	);
}
