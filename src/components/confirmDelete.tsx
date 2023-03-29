import React, { SetStateAction } from "react";
import { IoIosClose } from "react-icons/io";

type ConfirmDeleteType = {
	message: string;
	setConfirmDelete: React.Dispatch<SetStateAction<{ show: boolean; delete: boolean } | undefined>>;
};

export default function ConfirmDelete({ message, setConfirmDelete }: ConfirmDeleteType) {
	return (
		<>
			<div className="w-full h-full left-0 top-0 blur-2xl absolute  bg-bgColor/80  "></div>
			<div className="z-50 absolute  top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%]  sm:w-[400px] w-[90%]  py-5 rounded-lg bg-secondaryColor flex flex-col justify-center items-center gap-4">
				<div className="flex w-full flex-col justify-center items-center gap-2 mt-1">
					<p>Tem certeza que deseja excluir {message}?</p>
					<div className="flex w-full justify-center items-center gap-2 mt-5">
						<button
							onClick={() => setConfirmDelete({ show: false, delete: true })}
							className="bg-redColor border-2 border-redColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
						>
							Excluir
						</button>
						<button
							onClick={() => setConfirmDelete({ show: false, delete: false })}
							className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
