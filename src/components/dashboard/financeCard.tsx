import Link from "next/link";
import React, { useState } from "react";
import ConfirmDelete from "../confirmDelete";

type financeData = {
	name: string;
	date: string;
	entry: string;
	id: number;
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

export default function FinanceCard({ name, date, entry, id }: financeData) {
	const [confirmDelete, setConfirmDelete] = useState<boolean>();
	const year = new Date(date).getFullYear();
	const month: string = (fullMonth as Record<string, string>)[new Date(date).getMonth() + 1];

	return (
		<div className="px-8 h-80 w-80 flex justify-center flex-col gap-2 bg-secondaryColor rounded-lg">
			<h1 className="text-center text-3xl font-bold">{name}</h1>
			<span className="text-center -mt-2 mb-6">
				{month} de {year}
			</span>
			<span>
				Entrada: <span className="font-bold">{entry}</span>
			</span>
			<span>
				saída: <span className="font-bold">R$ 2.000,00</span>
			</span>
			<span>
				balanço: <span className="font-bold text-greenColor">R$ 1.000,00</span>
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
					onClick={() => setConfirmDelete(true)}
					className="bg-redColor border-2 border-redColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
				>
					Excluir
				</button>
			</div>

			{confirmDelete ? (
				<ConfirmDelete message="a planilha Título" setConfirmDelete={setConfirmDelete} />
			) : undefined}
		</div>
	);
}
