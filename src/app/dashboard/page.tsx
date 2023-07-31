"use client";

import CreateFinance from "@/components/dashboard/createFinance";
import FinanceCard from "@/components/dashboard/financeCard";
import Footer from "@/components/layout/footer";
import HeaderAuth from "@/components/layout/headerAuth";
import { getCookie } from "@/functions/getCookie";
import { getUserId } from "@/functions/getUserId";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const api_url = process.env.NEXT_PUBLIC_API_URL;

type ExpensesType = {
	id: number;
	name: string;
	value: number;
};

type financeData = {
	id: number;
	name: string;
	date: string;
	entry: string;
	expenses: ExpensesType[];
};

type responseFetchFinance = {
	success: boolean;
	message: financeData[];
};

const primaryColor =
	(resolveConfig(tailwindConfig)?.theme?.colors?.primaryColor as string | undefined) || "white";

export default function Dashboard() {
	const [showCreateFinance, setShowCreateFinance] = useState<boolean>();
	const [financeData, setFinanceData] = useState<financeData[]>([]);
	const [fetchDataAgain, setFetchDataAgain] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>(true);

	const fetchFinanceData = async () => {
		setLoading(true);
		const token = getCookie("token");
		const userId = getUserId();
		const data: responseFetchFinance = await fetch(`${api_url}/financePlan/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());
		await setFinanceData(data.message);
		setLoading(false);
	};

	useEffect(() => {
		fetchFinanceData();
	}, [fetchDataAgain]);

	return (
		<>
			<HeaderAuth />
			<main className="min-h-[80vh] flex flex-col sm:justify-center justify-start items-center gap-20">
				<div className="flex mt-20 sm:mt-0 flex-wrap items-center sm:gap-0 gap-10 justify-between w-full">
					<h1 className="sm:text-5xl text-4xl font-bold">Dashboard</h1>
					<button
						onClick={() => setShowCreateFinance(true)}
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm"
					>
						Criar +
					</button>
				</div>
				<div className="w-full flex justify-center lg:justify-start items-center flex-wrap gap-5 min-h-[320px]">
					{loading ? (
						<>
							<div className="w-full mt-20 flex justify-center items-center">
								<ScaleLoader color={primaryColor} />
							</div>
						</>
					) : (
						financeData?.map((finance) => {
							return (
								<>
									<FinanceCard
										key={finance.id}
										name={finance.name}
										date={finance.date}
										entry={finance.entry}
										id={finance.id}
										expensesData={finance.expenses}
										fetchDataAgain={fetchDataAgain}
										setFetchDataAgain={setFetchDataAgain}
									/>
								</>
							);
						})
					)}

					{showCreateFinance ? (
						<CreateFinance
							setShowCreateFinance={setShowCreateFinance}
							fetchDataAgain={fetchDataAgain}
							setFetchDataAgain={setFetchDataAgain}
						/>
					) : undefined}
				</div>
			</main>
			<Footer />
		</>
	);
}
