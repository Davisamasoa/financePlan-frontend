import { getCookie } from "@/functions/getCookie";
import React, { SetStateAction, useState } from "react";

type CreateGoalType = {
	setCreateGoal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
	financePlanId: string;
	setFetchDataAgain: React.Dispatch<SetStateAction<boolean | undefined>>;
	fetchDataAgain: boolean | undefined;
};

const api_url = process.env.NEXT_PUBLIC_API_URL;

export default function CreateGoal({
	setCreateGoal,
	financePlanId,
	setFetchDataAgain,
	fetchDataAgain,
}: CreateGoalType) {
	const [nameInputValue, setNameInputValue] = useState<string>("");

	function handleNameInput(e: React.FormEvent<HTMLInputElement>) {
		setNameInputValue(e.currentTarget.value);
	}

	const postNewExpense = async () => {
		const token = getCookie("token");
		await fetch(`${api_url}/goal`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: nameInputValue,
				financePlanId,
			}),
		}).then((res) => res.json());

		setFetchDataAgain(!fetchDataAgain);
		setCreateGoal(false);
	};

	return (
		<>
			<div className="w-full h-full top-0 left-0 blur-2xl absolute  bg-bgColor/80  "></div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setCreateGoal(false);
				}}
				className="z-50 absolute  top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%]  sm:w-[360px] w-full p-10 rounded-lg bg-secondaryColor flex flex-col justify-center items-center gap-4"
			>
				<h1 className="mb-2  sm:text-4xl text-2xl text-center font-bold">Criar nova meta</h1>
				<div className="flex flex-col gap-1 w-full">
					<label>Nome da meta:</label>
					<input
						className="w-full mb-4 px-3 bg-transparent border-2 border-primaryColor py-1  rounded-full"
						type="text"
						name="goal"
						placeholder="Comprar um celular"
						required
						value={nameInputValue}
						onChange={handleNameInput}
					/>
				</div>
				<div className="flex w-full justify-start items-center gap-2 mt-5">
					<button
						onClick={postNewExpense}
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Criar
					</button>
					<button
						onClick={() => setCreateGoal(false)}
						className="bg-redColor border-2 border-redColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Cancelar
					</button>
				</div>
			</form>
		</>
	);
}
