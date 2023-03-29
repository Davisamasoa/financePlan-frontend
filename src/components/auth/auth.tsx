"use client";

import { checkIsPublic } from "@/functions/checkRoutes";
import { usePathname } from "next/navigation";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

import "react";

export default function Auth({ children }: { children: React.ReactNode }) {
	const pathName = usePathname();

	const isPublic = checkIsPublic(pathName);

	return (
		<>{!isPublic ? <PrivateRoute> {children} </PrivateRoute> : <PublicRoute> {children} </PublicRoute>}</>
	);
}
