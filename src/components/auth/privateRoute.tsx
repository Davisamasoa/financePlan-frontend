import { APP_ROUTES } from "@/contants/app-routes";
import { getCookie } from "@/functions/getCookie";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
	const { push } = useRouter();

	const isAuthenticated = getCookie("token");

	useEffect(() => {
		if (!isAuthenticated) {
			push(APP_ROUTES.public.login);
		}
	}, [isAuthenticated, push]);

	return (
		<>
			{!isAuthenticated && null}
			{isAuthenticated && children}
		</>
	);
}
