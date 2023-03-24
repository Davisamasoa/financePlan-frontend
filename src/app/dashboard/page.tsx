"use client";

import CreateFinance from "@/components/createFinance";
import FinanceCard from "@/components/financeCard";
import Footer from "@/components/footer";
import HeaderAuth from "@/components/headerAuth";
import { useState } from "react";

export default function Home() {
	const [showCreateFinance, setShowCreateFinance] = useState<boolean>();

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
				<div className="w-full flex justify-center lg:justify-between items-center flex-wrap gap-5 ">
					<FinanceCard />
					<FinanceCard />
					<FinanceCard />

					{showCreateFinance ? <CreateFinance setShowCreateFinance={setShowCreateFinance} /> : undefined}
				</div>
			</main>
			<Footer />
		</>
	);
}
