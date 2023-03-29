"use client";
import { APP_ROUTES } from "@/contants/app-routes";
import { getCookie } from "@/functions/getCookie";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
	const { push } = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	useEffect(() => {
		const isAuthenticated = getCookie("token");
		if (!isAuthenticated) {
			setIsAuthenticated(false);
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
