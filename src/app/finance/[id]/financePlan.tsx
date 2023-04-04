"use client";
import Footer from "@/components/layout/footer";
import HeaderAuth from "@/components/layout/headerAuth";
import React, { useEffect, useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";

import Link from "next/link";
import Chart from "@/components/finance/chart";
import Expenses from "@/components/finance/expense";
import Goals from "@/components/finance/goal";
import { getCookie } from "@/functions/getCookie";
import EditFinance from "@/components/finance/edit";
import ScaleLoader from "react-spinners/ScaleLoader";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";

const api_url = process.env.NEXT_PUBLIC_API_URL;

type BudgetInformationsType = {
	entry: number;
	exit: number;
};

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
	message: financeData;
};

const fullMonth = {
	1: "Janeiro",
	2: "Fevereiro",
	3: "Março",
	4: "Abril",
	5: "Maio",
	6: "Junho",
	7: "Julho",
	8: "Agosto",
	9: "Setembro",
	10: "Outubro",
	11: "Novembro",
	12: "Dezembro",
};
const primaryColor =
	(resolveConfig(tailwindConfig)?.theme?.colors?.primaryColor as string | undefined) || "white";

export default function Finance({ params }: { params: { id: string } }) {
	const [budgetInformations, setBudgetInformations] = useState<BudgetInformationsType>({
		entry: 3000,
		exit: 0,
	});
	const [title, setTitle] = useState<string>();
	const [date, setDate] = useState<{ month: string; year: number }>({
		month: "",
		year: 2023,
	});

	const [fetchDataAgain, setFetchDataAgain] = useState<boolean>();
	const [editFinancePlan, setEditFinancePlan] = useState<boolean | undefined>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchFinanceData = async () => {
		setLoading(true);
		const token = getCookie("token");
		const data: responseFetchFinance = await fetch(`${api_url}/financePlan/id/${params.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());

		setDate({
			month: (fullMonth as Record<string, string>)[new Date(data.message.date).getMonth() + 1],
			year: new Date(data.message.date).getFullYear(),
		});
		setBudgetInformations({ ...budgetInformations, entry: +data.message.entry });
		setTitle(data.message.name);
		setLoading(false);
	};

	useEffect(() => {
		fetchFinanceData();
	}, [fetchDataAgain]);
	return (
		<>
			<HeaderAuth />

			{loading ? (
				<div className="h-[80vh] w-full flex justify-center items-center">
					<ScaleLoader color={primaryColor} />
				</div>
			) : (
				<>
					<div className="w-full mt-10">
						<Link href={"/dashboard"}>
							<button className="bg-primaryColor border-2 border-primaryColor py-[2px] sm:px-6 px-3 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm">
								<IoArrowUndoSharp size={25} className="text-bgColor" />
							</button>
						</Link>
					</div>

					<div className="flex justify-center items-center mb-10 mt-10 sm:mt-0">
						<div className="w-full flex justify-center items-center flex-col">
							<h1 className="text-5xl font-bold">{title}</h1>
							<span className="text-center mt-3 sm:mt-0">
								{date.month} de {date.year}
							</span>
						</div>
						<button
							onClick={() => setEditFinancePlan(true)}
							className="bg-primaryColor absolute right-4 border-2 border-primaryColor py-1 sm:px-6 px-3 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm"
						>
							Editar
						</button>
					</div>
					<main className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-[full] gap-5">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="w-full rounded-lg h-full bg-secondaryColor flex flex-col text-2xl justify-center items-start p-6 md:p-10 pr-4 lg:pl-14 gap-5">
								<span className="font-light">
									Entrada:
									<span className="font-bold text-greenColor">
										<span className="text-greenColor"> +</span>
										{budgetInformations.entry.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
									</span>
								</span>
								<span className="font-light">
									Saída:
									<span className="font-bold text-redColor">
										<span className="text-redColor"> -</span>
										{budgetInformations.exit.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
									</span>
								</span>
								<span className="font-light">
									Balanço:
									<span className="font-bold">
										<span
											className={`font-bold ${
												budgetInformations.entry - budgetInformations.exit < 0
													? "text-redColor"
													: "text-greenColor"
											}`}
										>
											{" "}
											{budgetInformations.entry - budgetInformations.exit < 0 ? "" : "+"}
											{(budgetInformations.entry - budgetInformations.exit).toLocaleString("pt-br", {
												style: "currency",
												currency: "BRL",
											})}
										</span>
									</span>
								</span>
							</div>

							<div className="w-full p-6 min-h-[308px]   gap-5 flex justify-start items-center flex-col  rounded-lg h-full bg-secondaryColor">
								<h1 className="text-4xl font-bold">Economia</h1>

								<Chart
									balance={budgetInformations.entry - budgetInformations.exit}
									exit={budgetInformations.exit}
								/>
							</div>
						</div>

						<Expenses
							financePlanId={params.id}
							setBudgetInformation={setBudgetInformations}
							budgetInformations={budgetInformations}
						/>
						<Goals financePlanId={params.id} />
					</main>

					{editFinancePlan ? (
						<EditFinance
							entry={budgetInformations.entry}
							fetchDataAgain={fetchDataAgain}
							setFetchDataAgain={setFetchDataAgain}
							id={+params.id}
							title={title}
							setShowEditFinance={setEditFinancePlan}
						/>
					) : null}
				</>
			)}

			<Footer />
		</>
	);
}
