"use client";
import PrivateRoute from "@/components/auth/privateRoute";
import PublicRoute from "@/components/auth/publicRoute";
import { checkIsPublic } from "@/functions/checkRoutes";
import { getCookie } from "@/functions/getCookie";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";

export const metadata = {
	title: "Finance Plan",
	description: "Quer organizar seus gastos? Chega de planilha, use o financePlan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathName = usePathname();

	const isPublic = checkIsPublic(pathName);

	return (
		<html lang="pt-br">
			<body className=" bg-bgColor text-textColor max-w-[1300px] min-h-screen h-full pb-24 relative mx-auto px-4">
				<>{!isPublic ? <PrivateRoute> {children} </PrivateRoute> : <PublicRoute> {children} </PublicRoute>}</>
			</body>
		</html>
	);
}
