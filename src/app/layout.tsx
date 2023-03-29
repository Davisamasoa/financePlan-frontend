import Auth from "@/components/auth/auth";
import PrivateRoute from "@/components/auth/privateRoute";
import PublicRoute from "@/components/auth/publicRoute";
import { checkIsPublic } from "@/functions/checkRoutes";
import { usePathname } from "next/navigation";
import "./globals.css";

export const metadata = {
	title: {
		default: "Finance Plan",
		template: "%s - Finance Plan",
	},

	description: "Quer organizar seus gastos? Chega de planilha, use o financePlan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body className=" bg-bgColor text-textColor max-w-[1300px] min-h-screen h-full pb-24 relative mx-auto px-4">
				<Auth>{children} </Auth>
			</body>
		</html>
	);
}
