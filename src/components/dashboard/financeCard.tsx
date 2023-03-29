import { getCookie } from "@/functions/getCookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmDelete from "../confirmDelete";

type ExpensesType = {
	id: number;
	name: string;
	value: number;
};

type financeData = {
	name: string;
	date: string;
	entry: string;
	id: number;
	expensesData: ExpensesType[];
	fetchDataAgain: boolean | undefined;
	setFetchDataAgain: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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

const api_url = process.env.NEXT_PUBLIC_API_URL;

export default function FinanceCard({
	name,
	date,
	entry,
	id,
	expensesData,
	fetchDataAgain,
	setFetchDataAgain,
}: financeData) {
	const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; delete: boolean }>();
	const [expenses, setExpenses] = useState<number>(0);
	const year = new Date(date).getFullYear();
	const month: string = (fullMonth as Record<string, string>)[new Date(date).getMonth() + 1];

	useEffect(() => {
		// setExpenses(expensesData.reduce((acc, expense) => acc + expense.value, 0));
		console.log(expensesData);
	}, []);

	async function deleteFinance(financePlanId: number) {
		const token = getCookie("token");
		await fetch(`${api_url}/financePlan/${financePlanId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());
		setFetchDataAgain(!fetchDataAgain);
	}
	if (confirmDelete?.delete) {
		deleteFinance(id);
		setConfirmDelete({ delete: false, show: false });
	}

	return (
		<div className="px-8 h-80 w-80 flex justify-center flex-col gap-2 bg-secondaryColor rounded-lg">
			<h1 className="text-center text-3xl font-bold">{name}</h1>
			<span className="text-center -mt-2 mb-6">
				{month} de {year}
			</span>
			<span>
				Entrada:
				<span className="font-bold">
					{" "}
					{Number(entry).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
				</span>
			</span>
			<span>
				saída:
				<span className="font-bold">
					{" "}
					{Number(expenses).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
				</span>
			</span>

			<span>
				balanço:
				<span className={`font-bold ${+entry - expenses < 0 ? "text-redColor" : "text-greenColor"}`}>
					{" "}
					{(+entry - expenses).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
				</span>
			</span>
			<div className="flex justify-start items-center gap-2 mt-5">
				<Link
					href={`finance/${id}`}
					target="_blank"
					className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
				>
					Abrir
				</Link>
				<button
					onClick={() => setConfirmDelete({ show: true, delete: false })}
					className="bg-redColor border-2 border-redColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
				>
					Excluir
				</button>
			</div>

			{confirmDelete?.show ? (
				<ConfirmDelete message="a planilha Título" setConfirmDelete={setConfirmDelete} />
			) : undefined}
		</div>
	);
}
