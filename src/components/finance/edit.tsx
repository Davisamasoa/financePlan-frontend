import { getCookie } from "@/functions/getCookie";

import React, { useState } from "react";

type CreateFinanceType = {
	setShowEditFinance: React.Dispatch<React.SetStateAction<boolean | undefined>>;
	fetchDataAgain: boolean | undefined;
	setFetchDataAgain: React.Dispatch<React.SetStateAction<boolean | undefined>>;
	title: string | undefined;
	entry: number | string | undefined;
	id: number;
};

const api_url = process.env.NEXT_PUBLIC_API_URL;

export default function EditFinance({
	setShowEditFinance,
	fetchDataAgain,
	setFetchDataAgain,
	title,
	entry,
	id,
}: CreateFinanceType) {
	const [nameInputValue, setNameInputValue] = useState<string | undefined>(title);
	const [entryInputValue, setEntryInputValue] = useState<string | number | undefined>(entry);
	const [validateMessage, setValidateMessage] = useState<string | null>();

	function handleNameInput(e: React.FormEvent<HTMLInputElement>) {
		setNameInputValue(e.currentTarget.value);
	}

	function handleValueInput(e: React.FormEvent<HTMLInputElement>) {
		setEntryInputValue(e.currentTarget.value);
	}

	const editFinance = async () => {
		if (
			nameInputValue == "" ||
			entryInputValue == "" ||
			nameInputValue == undefined ||
			entryInputValue == undefined
		) {
			setValidateMessage("Preencha todos os campos!");
		} else {
			const token = getCookie("token");
			await fetch(`${api_url}/financePlan/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					name: nameInputValue,

					entry: +entryInputValue,
				}),
			}).then((res) => res.json());

			setFetchDataAgain(!fetchDataAgain);
			setShowEditFinance(false);
		}
	};

	return (
		<>
			<div className="w-full h-full top-0 left-0 blur-2xl absolute  bg-bgColor/80  "></div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setShowEditFinance(false);
				}}
				className="z-50 absolute  top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%]  sm:w-[360px] w-full p-10 rounded-lg bg-secondaryColor flex flex-col justify-center items-center gap-4"
			>
				<h1 className="mb-2  sm:text-4xl text-2xl text-center font-bold">Editar planilha financeira</h1>
				<div className="flex flex-col gap-1 w-full">
					<label>Nome da planilha:</label>
					<input
						className="w-full mb-4 px-3 bg-transparent border-2 border-primaryColor py-1  rounded-full"
						type="text"
						name="finance-name"
						placeholder="Orçamento março 2023"
						required
						value={nameInputValue}
						onChange={handleNameInput}
					/>
					<label className="">Digite seu orçamento:</label>
					<input
						className="w-full px-3 bg-transparent border-2 border-primaryColor py-1  rounded-full"
						type="number"
						name="budget-value"
						placeholder="500"
						required
						value={entryInputValue}
						onChange={handleValueInput}
					/>
				</div>
				<p
					className={`min-h-[20px] text-sm ${
						validateMessage ? "text-center mt-2" : "text-end"
					} text-redColor`}
				>
					{validateMessage ? validateMessage : ""}
				</p>
				<div className="flex w-full justify-start items-center gap-2 mt-5">
					<button
						onClick={editFinance}
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Editar
					</button>
					<button
						onClick={() => setShowEditFinance(false)}
						className="bg-redColor border-2 border-redColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Cancelar
					</button>
				</div>
			</form>
		</>
	);
}
