"use client";
import Footer from "@/components/layout/footer";
import HeaderAuth from "@/components/layout/headerAuth";
import React, { useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";

import Link from "next/link";
import Chart from "@/components/finance/chart";
import Expenses from "@/components/finance/expense";
import Goals from "@/components/finance/goal";
import { getCookie } from "@/functions/getCookie";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie("token");

type BudgetInformationsType = {
	entry: number;
	exit: number;
};

export default function Finance({ params }: { params: { id: string } }) {
	const [budgetInformations, setBudgetInformations] = useState<BudgetInformationsType>({
		entry: 3000,
		exit: 0,
	});

	return (
		<>
			<HeaderAuth />
			<div className="w-full mt-10">
				<Link href={"/dashboard"}>
					<button className="bg-primaryColor border-2 border-primaryColor py-[2px] sm:px-6 px-3 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm">
						<IoArrowUndoSharp size={25} className="text-bgColor" />
					</button>
				</Link>
			</div>

			<div className="flex justify-center items-center mb-10">
				<div className="w-full flex justify-center items-center flex-col">
					<h1 className="text-5xl font-bold">Título</h1>
					<span className="text-center">Março 2023</span>
				</div>
				<button className="bg-primaryColor absolute right-4 border-2 border-primaryColor py-1 sm:px-6 px-3 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm">
					Editar
				</button>
			</div>

			<main className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-[full] gap-5">
				<div className="flex gap-5 flex-col justify-center items-center">
					<div className="w-full rounded-lg h-full bg-secondaryColor flex flex-col text-2xl justify-center items-start p-6 md:p-10 pr-4 lg:pl-14 gap-5">
						<span className="font-light">
							Entrada:
							<span className="font-bold">
								<span className="text-greenColor"> + </span>
								{budgetInformations.entry.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
							</span>
						</span>
						<span className="font-light">
							Saída:
							<span className="font-bold">
								<span className="text-redColor"> + </span>
								{budgetInformations.exit.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
							</span>
						</span>
						<span className="font-light">
							Balanço:
							<span className="font-bold">
								<span className="text-greenColor">
									{" "}
									+{" "}
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
			<Footer />
		</>
	);
}
