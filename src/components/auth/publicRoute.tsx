import { APP_ROUTES } from "@/contants/app-routes";
import { getCookie } from "@/functions/getCookie";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

export default function PublicRoute({ children }: { children: ReactNode }) {
	const { push } = useRouter();
	const pathName = usePathname();

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const isAuthenticated = getCookie("token");

		if (isAuthenticated) {
			setIsAuthenticated(true);
			push(APP_ROUTES.private.dashboard.name);
		}
	}, [isAuthenticated, push, pathName]);

	return (
		<>
			{isAuthenticated && null}
			{!isAuthenticated && pathName !== "/" && children}
			{pathName == "/" && children}
		</>
	);
}
