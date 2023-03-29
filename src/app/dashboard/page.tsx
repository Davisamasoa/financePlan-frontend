"use client";

import CreateFinance from "@/components/dashboard/createFinance";
import FinanceCard from "@/components/dashboard/financeCard";
import Footer from "@/components/layout/footer";
import HeaderAuth from "@/components/layout/headerAuth";
import { getCookie } from "@/functions/getCookie";
import { getUserId } from "@/functions/getUserId";
import { useCallback, useEffect, useState } from "react";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie("token");

type financeData = {
	id: number;
	name: string;
	date: string;
	entry: string;
};

type responseFetchFinance = {
	success: boolean;
	message: financeData[];
};

const userId = getUserId();

export default function Home() {
	const [showCreateFinance, setShowCreateFinance] = useState<boolean>();
	const [financeData, setFinanceData] = useState<financeData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchFinanceData = useCallback(async () => {
		const data: responseFetchFinance = await fetch(`${api_url}/financePlan/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());
		setFinanceData(data.message);
		setLoading(false);
	}, [financeData]);

	useEffect(() => {
		fetchFinanceData();
	}, []);

	return (
		<>
			<HeaderAuth />
			<main className="min-h-[80vh] mt-10 sm:mt-0 flex flex-col justify-center items-center gap-20">
				<div className="flex flex-wrap justify-start sm:gap-0 gap-10 sm:justify-between items-center w-full">
					<h1 className="sm:text-5xl text-4xl font-bold">Dashboard</h1>
					<button
						onClick={() => setShowCreateFinance(true)}
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm"
					>
						Criar +
					</button>
				</div>
				<div className="w-full flex justify-center lg:justify-start items-center flex-wrap gap-5 ">
					{loading ? (
						<h1>Carregando...</h1>
					) : (
						financeData?.map((finance) => {
							return (
								<FinanceCard
									key={finance.id}
									name={finance.name}
									date={finance.date}
									entry={finance.entry}
									id={finance.id}
								/>
							);
						})
					)}

					{showCreateFinance ? <CreateFinance setShowCreateFinance={setShowCreateFinance} /> : undefined}
				</div>
			</main>
			<Footer />
		</>
	);
}
