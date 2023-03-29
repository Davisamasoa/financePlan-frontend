import React from "react";

type CreateFinanceType = {
	setShowCreateFinance: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export default function CreateFinance({ setShowCreateFinance }: CreateFinanceType) {
	return (
		<>
			<div className="w-full h-full top-0 left-0 blur-2xl absolute  bg-bgColor/80  "></div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setShowCreateFinance(false);
				}}
				className="z-50 absolute  top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%]  sm:w-[360px] w-full p-10 rounded-lg bg-secondaryColor flex flex-col justify-center items-center gap-4"
			>
				<h1 className="mb-2  sm:text-4xl text-2xl text-center font-bold">Criar planilha financeira</h1>
				<div className="flex flex-col gap-1 w-full">
					<label>Nome da planilha:</label>
					<input
						className="w-full mb-4 px-3 bg-transparent border-2 border-primaryColor py-1  rounded-full"
						type="text"
						name="name"
						placeholder="Orçamento março 2023"
						required
					/>
					<label className="">Digite seu orçamento:</label>
					<input
						className="w-full px-3 bg-transparent border-2 border-primaryColor py-1  rounded-full"
						type="number"
						name="entry-value"
						placeholder="500"
						required
					/>
				</div>
				<div className="flex w-full justify-start items-center gap-2 mt-5">
					<button
						type="submit"
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Criar
					</button>
					<button
						onClick={() => setShowCreateFinance(false)}
						className="bg-redColor border-2 border-redColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Cancelar
					</button>
				</div>
			</form>
		</>
	);
}
