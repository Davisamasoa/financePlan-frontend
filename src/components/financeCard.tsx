import React, { useState } from "react";
import ConfirmDelete from "./confirmDelete";

export default function FinanceCard() {
	const [confirmDelete, setConfirmDelete] = useState<boolean>();

	return (
		<div className="py-5 px-8 h-80 w-80 flex flex-col gap-2 bg-secondaryColor rounded-lg">
			<h1 className="text-center text-3xl font-bold">Título</h1>
			<span className="text-center -mt-2 mb-6">março 2023</span>
			<span>
				Entrada: <span className="font-bold">R$ 3.000,00</span>
			</span>
			<span>
				saída: <span className="font-bold">R$ 2.000,00</span>
			</span>
			<span>
				balanço: <span className="font-bold text-greenColor">R$ 1.000,00</span>
			</span>
			<div className="flex justify-start items-center gap-2 mt-5">
				<button className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm">
					Criar
				</button>
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
