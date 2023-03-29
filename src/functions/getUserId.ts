import * as jwt from "jsonwebtoken";
import { getCookie } from "./getCookie";

interface JwtPayload {
	sub: string;
	iat: number;
	exp: number;
	id: string;
}

export function getUserId(): string {
	const token = getCookie("token");

	const userId = jwt.decode(token!) as JwtPayload;

	return userId?.id;
}
