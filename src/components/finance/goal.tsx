import { getCookie } from "@/functions/getCookie";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import CreateGoal from "./goal/create";
import EditGoal from "./goal/edit";
import { IoMdSquareOutline, IoIosCheckboxOutline } from "react-icons/io";

type GoalsType = {
	id: number;
	name: string;
	done: boolean;
};

type editGoalType = {
	id?: number;
	show: boolean;
	name?: string;
	done?: boolean;
};

const api_url = process.env.NEXT_PUBLIC_API_URL;

export default function Goals({ financePlanId }: { financePlanId: string }) {
	const [goals, setGoals] = useState<GoalsType[]>([]);
	const [fetchDataAgain, setFetchDataAgain] = useState<boolean>();
	const [createGoal, setCreateGoal] = useState<boolean>();
	const [editGoal, setEditGoal] = useState<editGoalType>();

	const fetchGoalsData = async () => {
		const token = getCookie("token");
		const data = await fetch(`${api_url}/goal/${financePlanId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());
		setGoals(data.message);
	};

	const toggleDone = async (goalId: number, done: boolean) => {
		const token = getCookie("token");
		await fetch(`${api_url}/goal/${goalId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				done: !done,
			}),
		}).then((res) => res.json());

		setFetchDataAgain(!fetchDataAgain);
	};

	async function deleteGoal(goalId: number) {
		const token = getCookie("token");
		await fetch(`${api_url}/goal/${goalId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((data) => data.json());
		setFetchDataAgain(!fetchDataAgain);
	}

	useEffect(() => {
		fetchGoalsData();
	}, [fetchDataAgain]);

	return (
		<div className="w-full  p-6  md:pl-10 lg:px-14 gap-5  flex flex-col justify-start py-5 items-start  rounded-lg h-full bg-secondaryColor">
			<div className="flex w-full justify-center items-center gap-2">
				<h1 className="text-4xl font-bold">Metas</h1>
				<button
					onClick={() => setCreateGoal(true)}
					className="font-bold text-bgColor rounded-full sm:hover:opacity-80  transition duration-300"
				>
					<AiFillPlusCircle size={40} className="text-primaryColor" />
				</button>
			</div>

			<ul className="text-xl flex flex-col gap-2 max-h-[168px] lg:max-h-[424px] w-full overflow-y-auto pr-6">
				{goals.map((goal, index) => (
					<>
						<li key={index} className="flex gap-2 justify-between items-center">
							<button onClick={() => toggleDone(goal.id, goal.done)}>
								{goal.done ? (
									<IoIosCheckboxOutline className="text-primaryColor" size={18} />
								) : (
									<IoMdSquareOutline className="text-primaryColor" size={18} />
								)}
							</button>
							<span className={`${goal.done ? "line-through" : null}`}>{goal.name}</span>
							<div className="flex justify-center items-center gap-1">
								<button
									onClick={() => setEditGoal({ show: true, done: goal.done, id: goal.id, name: goal.name })}
									className="sm:hover:opacity-80 transition duration-300"
								>
									<FaRegEdit size={18} className="text-primaryColor" />
								</button>
								<button
									onClick={() => deleteGoal(goal.id)}
									className="sm:hover:opacity-80 transition duration-300"
								>
									<FaTrash size={15} className="text-primaryColor" />
								</button>
							</div>
						</li>
						{!(index == goals.length - 1) ? <hr className="text-textColor opacity-20" /> : undefined}
					</>
				))}
			</ul>

			{createGoal ? (
				<CreateGoal
					setCreateGoal={setCreateGoal}
					fetchDataAgain={fetchDataAgain}
					setFetchDataAgain={setFetchDataAgain}
					financePlanId={financePlanId}
				/>
			) : null}
			{editGoal?.show ? (
				<EditGoal
					name={editGoal.name}
					showEditGoal={editGoal}
					setShowEditGoal={setEditGoal}
					fetchDataAgain={fetchDataAgain}
					setFetchDataAgain={setFetchDataAgain}
					goalId={editGoal.id}
				/>
			) : null}
		</div>
	);
}
