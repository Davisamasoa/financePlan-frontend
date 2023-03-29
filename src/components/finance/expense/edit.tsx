import { getCookie } from "@/functions/getCookie";
import React, { SetStateAction, useState } from "react";

type editExpenseStateType = {
	id?: number;
	show: boolean;
	name?: string;
	value?: number;
};

type editExpenseType = {
	showEditExpense: editExpenseStateType;
	setShowEditExpense: React.Dispatch<React.SetStateAction<editExpenseStateType | undefined>>;
	expenseId: number | undefined;
	setFetchDataAgain: React.Dispatch<SetStateAction<boolean | undefined>>;
	fetchDataAgain: boolean | undefined;
	name: string | undefined;
	value: number | undefined;
};

const api_url = process.env.NEXT_PUBLIC_API_URL;

export default function EditExpense({
	showEditExpense,
	setShowEditExpense,
	expenseId,
	setFetchDataAgain,
	fetchDataAgain,
	name,
	value,
}: editExpenseType) {
	const [nameInputValue, setNameInputValue] = useState<string | undefined>(name);
	const [valueInputValue, setValueInputValue] = useState<number | string | undefined>(value);

	function handleNameInput(e: React.FormEvent<HTMLInputElement>) {
		setNameInputValue(e.currentTarget.value);
	}

	function handleValueInput(e: React.FormEvent<HTMLInputElement>) {
		setValueInputValue(e.currentTarget.value);
	}

	const editExpense = async () => {
		const token = getCookie("token");

		await fetch(`${api_url}/expense/${expenseId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: nameInputValue,
				value: typeof valueInputValue == "string" ? +valueInputValue : undefined,
			}),
		}).then((res) => res.json());

		setFetchDataAgain(!fetchDataAgain);
		setShowEditExpense({ show: false });
	};

	return (
		<>
			<div className="w-full h-full top-0 left-0 blur-2xl absolute  bg-bgColor/80  "></div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="z-50 absolute  top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%]  sm:w-[360px] w-full p-10 rounded-lg bg-secondaryColor flex flex-col justify-center items-center gap-4"
			>
				<h1 className="mb-2  sm:text-4xl text-2xl text-center font-bold">Editar despesa</h1>
				<div className="flex flex-col gap-1 w-full">
					<label>Nome da despesa:</label>
					<input
						className="w-full mb-4 px-3 bg-transparent border-2 border-primaryColor py-1  rounded-full"
						type="text"
						name="expense"
						placeholder="Conta de luz"
						required
						value={nameInputValue}
						onChange={handleNameInput}
					/>
					<label className="">Digite o valor da despesa:</label>
					<input
						className="w-full px-3 bg-transparent border-2 border-primaryColor py-1  rounded-full"
						type="number"
						name="expense-value"
						placeholder="200"
						required
						value={valueInputValue}
						onChange={handleValueInput}
					/>
				</div>
				<div className="flex w-full justify-start items-center gap-2 mt-5">
					<button
						onClick={editExpense}
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Editar
					</button>
					<button
						onClick={() => setShowEditExpense({ ...showEditExpense, show: false })}
						className="bg-redColor border-2 border-redColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Cancelar
					</button>
				</div>
			</form>
		</>
	);
}
