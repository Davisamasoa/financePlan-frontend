import { getCookie } from "@/functions/getCookie";
import React, { SetStateAction, useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import CreateExpense from "./expense/create";
import EditExpense from "./expense/edit";

type ExpensesType = {
	id: number;
	name: string;
	value: number;
};

type responseFetch = {
	success: boolean;
	message: ExpensesType[];
};

type BudgetInformationsType = {
	entry: number;
	exit: number;
};

type editExpenseType = {
	id?: number;
	show: boolean;
	name?: string;
	value?: number;
};

const api_url = process.env.NEXT_PUBLIC_API_URL;

type ExpensesProps = {
	financePlanId: string;
	setBudgetInformation: React.Dispatch<SetStateAction<BudgetInformationsType>>;
	budgetInformations: BudgetInformationsType;
};

export default function Expenses({ financePlanId, budgetInformations, setBudgetInformation }: ExpensesProps) {
	const [expenses, setExpenses] = useState<ExpensesType[]>([]);
	const [fetchDataAgain, setFetchDataAgain] = useState<boolean>();
	const [createExpense, setCreateExpense] = useState<boolean>();
	const [editExpense, setEditExpense] = useState<editExpenseType>();

	const fetchExpensesData = async () => {
		const token = getCookie("token");
		const data: responseFetch = await fetch(`${api_url}/expense/${financePlanId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());
		setExpenses(data.message);
	};

	async function deleteExpense(expenseId: number) {
		const token = getCookie("token");

		await fetch(`${api_url}/expense/${expenseId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());
		setFetchDataAgain(!fetchDataAgain);
	}

	useEffect(() => {
		fetchExpensesData();
	}, [fetchDataAgain]);

	useEffect(() => {
		setBudgetInformation({
			...budgetInformations,
			exit: expenses.reduce((acc, expense) => acc + expense.value, 0),
		});
	}, [expenses]);

	return (
		<div className="w-full  p-6  md:pl-10  gap-5  flex flex-col justify-start py-5 items-start  rounded-lg h-full bg-secondaryColor">
			<div className="flex w-full justify-center items-center gap-2">
				<h1 className="text-4xl font-bold">Despesas</h1>
				<button
					onClick={() => setCreateExpense(true)}
					className="font-bold text-bgColor rounded-full sm:hover:opacity-80  transition duration-300"
				>
					<AiFillPlusCircle size={40} className="text-primaryColor" />
				</button>
			</div>

			<ul className="text-xl flex flex-col gap-2 max-h-[168px] lg:max-h-[424px] w-full overflow-y-auto pr-6">
				{expenses.map((expense, index) => (
					<>
						<li key={expense.id} className="flex flex-wrap gap-2 justify-between items-center">
							<span>• {expense.name}</span>
							<span>-</span>
							<span className="font-bold">
								{expense.value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
							</span>
							<div className="flex justify-center items-center gap-1">
								<button
									onClick={() =>
										setEditExpense({ id: expense.id, show: true, name: expense.name, value: expense.value })
									}
									className="sm:hover:opacity-80 transition duration-300"
								>
									<FaRegEdit size={18} className="text-primaryColor" />
								</button>
								<button
									onClick={() => deleteExpense(expense.id)}
									className="sm:hover:opacity-80 transition duration-300"
								>
									<FaTrash size={15} className="text-primaryColor" />
								</button>
							</div>
						</li>

						{!(index == expenses.length - 1) ? <hr className="text-textColor opacity-20" /> : undefined}
					</>
				))}
			</ul>

			{createExpense ? (
				<CreateExpense
					setShowCreateExpense={setCreateExpense}
					fetchDataAgain={fetchDataAgain}
					setFetchDataAgain={setFetchDataAgain}
					financePlanId={financePlanId}
				/>
			) : null}
			{editExpense?.show ? (
				<EditExpense
					name={editExpense.name}
					value={editExpense.value}
					showEditExpense={editExpense}
					setShowEditExpense={setEditExpense}
					fetchDataAgain={fetchDataAgain}
					setFetchDataAgain={setFetchDataAgain}
					expenseId={editExpense.id}
				/>
			) : null}
		</div>
	);
}
