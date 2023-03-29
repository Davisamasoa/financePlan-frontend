import { APP_ROUTES } from "@/contants/app-routes";

export function checkIsPublic(asPath: string) {
	const appPublicRoutes = Object.values(APP_ROUTES.public);

	return appPublicRoutes.includes(asPath);
}
