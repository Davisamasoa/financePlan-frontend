import React from "react";
import Finance from "./financePlan";

export const metadata = {
	title: "Finance",
};

export default function page({ params }: { params: { id: string } }) {
	return <Finance params={params} />;
}
