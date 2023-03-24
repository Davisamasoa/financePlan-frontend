"use client";
import Footer from "@/components/footer";
import HeaderAuth from "@/components/headerAuth";
import React, { useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import Chart from "@/components/chart";

type ExpensesType = {
	name: string;
	value: number;
};

type GoalsType = {
	name: string;
};

type BudgetInformationsType = {
	entry: number;
	exit: number;
};

export default function Finance() {
	const [expenses, setExpenses] = useState<ExpensesType[]>([
		{ name: "shopping", value: 200 },
		{ name: "shopping", value: 200 },
		{ name: "shopping", value: 200 },
		{ name: "shopping", value: 200 },
		{ name: "shopping", value: 200 },
		{ name: "shopping", value: 200 },
		{ name: "shopping", value: 200 },
		{ name: "shopping", value: 200 },
	]);

	const [budgetInformations, setBudgetInformations] = useState<BudgetInformationsType>({
		entry: 3000,
		exit: expenses.reduce((acc, expense) => acc + expense.value, 0),
	});

	const [goals, setGoals] = useState<GoalsType[]>([
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
		{ name: "Comprar PC" },
	]);

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

				<div className="w-full  p-6 md:pl-10 lg:pl-14 pr-4 gap-5  flex flex-col justify-start py-5 items-start  rounded-lg h-full bg-secondaryColor">
					<div className="flex w-full justify-center items-center gap-2">
						<h1 className="text-4xl font-bold">Despesas</h1>
						<button className="font-bold text-bgColor rounded-full sm:hover:opacity-80  transition duration-300">
							<AiFillPlusCircle size={40} className="text-primaryColor" />
						</button>
					</div>

					<ul className="text-xl flex flex-col gap-2 max-h-[168px] lg:max-h-[424px] w-full overflow-y-auto pr-6">
						{expenses.map((expense, index) => (
							<>
								<li key={expense.name} className="flex flex-wrap gap-2 justify-between items-center">
									<span>• {expense.name}</span>
									<span>-</span>
									<span className="font-bold">
										{expense.value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
									</span>
									<div className="flex justify-center items-center gap-1">
										<button className="sm:hover:opacity-80 transition duration-300">
											<FaRegEdit size={18} className="text-primaryColor" />
										</button>
										<button className="sm:hover:opacity-80 transition duration-300">
											<FaTrash size={15} className="text-primaryColor" />
										</button>
									</div>
								</li>

								{!(index == expenses.length - 1) ? <hr className="text-textColor opacity-20" /> : undefined}
							</>
						))}
					</ul>
				</div>
				<div className="w-full  p-6  md:pl-10 lg:px-14 gap-5  flex flex-col justify-start py-5 items-start  rounded-lg h-full bg-secondaryColor">
					<div className="flex w-full justify-center items-center gap-2">
						<h1 className="text-4xl font-bold">Metas</h1>
						<button className="font-bold text-bgColor rounded-full sm:hover:opacity-80  transition duration-300">
							<AiFillPlusCircle size={40} className="text-primaryColor" />
						</button>
					</div>

					<ul className="text-xl flex flex-col gap-2 max-h-[168px] lg:max-h-[424px] w-full overflow-y-auto pr-6">
						{goals.map((goal, index) => (
							<>
								<li key={index} className="flex gap-2 justify-between items-center">
									<span>• {goal.name}</span>
									<div className="flex justify-center items-center gap-1">
										<button className="sm:hover:opacity-80 transition duration-300">
											<FaRegEdit size={18} className="text-primaryColor" />
										</button>
										<button className="sm:hover:opacity-80 transition duration-300">
											<FaTrash size={15} className="text-primaryColor" />
										</button>
									</div>
								</li>
								{!(index == goals.length - 1) ? <hr className="text-textColor opacity-20" /> : undefined}
							</>
						))}
					</ul>
				</div>
			</main>
			<Footer />
		</>
	);
}
