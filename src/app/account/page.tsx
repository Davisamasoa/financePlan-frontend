"use client";

import ConfirmDelete from "@/components/confirmDelete";
import Footer from "@/components/layout/footer";
import HeaderAuth from "@/components/layout/headerAuth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";

type EyeIconsType = {
	password: IconType;
	newPassword: IconType;
	confirmNewPassword: IconType;
};

type FormData = {
	password: string;
	newPassword: string;
	confirmNewPassword: string;
};

export default function Account() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const [PasswordEye, setPasswordEye] = useState<EyeIconsType>({
		password: AiOutlineEye,
		newPassword: AiOutlineEye,
		confirmNewPassword: AiOutlineEye,
	});

	const [serverError, setServerError] = useState<string>();
	const [confirmDelete, setConfirmDelete] = useState<boolean>();

	function onSubmit(data: FormData) {
		console.log(data);
	}

	function showPassword(element: string): void {
		const password: HTMLInputElement | null = document.querySelector(`#${element}`);
		if (password?.type == "password") {
			password.type = "text";
			switch (element) {
				case "password":
					setPasswordEye({ ...PasswordEye, password: AiOutlineEyeInvisible });
					break;
				case "newPassword":
					setPasswordEye({ ...PasswordEye, newPassword: AiOutlineEyeInvisible });
					break;
				case "confirmNewPassword":
					setPasswordEye({ ...PasswordEye, confirmNewPassword: AiOutlineEyeInvisible });
					break;
			}
		} else {
			password?.type ? (password.type = "password") : undefined;
			switch (element) {
				case "password":
					setPasswordEye({ ...PasswordEye, password: AiOutlineEye });
					break;
				case "newPassword":
					setPasswordEye({ ...PasswordEye, newPassword: AiOutlineEye });
					break;
				case "confirmNewPassword":
					setPasswordEye({ ...PasswordEye, confirmNewPassword: AiOutlineEye });
					break;
			}
		}
	}

	return (
		<>
			<HeaderAuth />
			<main className="min-h-[80vh]  flex flex-col gap-12  justify-center items-center">
				<h1 className="sm:text-5xl text-4xl font-bold">Configurações da conta</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
					className="sm:w-[360px] w-full sm:p-10 rounded-lg  flex flex-col justify-center items-center gap-4"
				>
					<h1 className="mb-2 w-full  sm:text-4xl text-2xl text-start font-bold">Trocar senha</h1>
					<div className="flex flex-col gap-1 w-full">
						<div className="w-full">
							<label htmlFor="password">Senha antiga:</label>
							<div className="relative">
								<input
									id="password"
									className="w-full px-8 bg-transparent border-2 border-primaryColor py-1  rounded-full"
									placeholder="Sua senha antiga"
									type="password"
									{...register("password", { required: true, minLength: 8 })}
								/>

								<MdOutlineLock size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
								<PasswordEye.password
									onClick={() => showPassword("password")}
									size={18}
									className="absolute top-2/4 right-3 translate-y-[-45%]"
								/>
							</div>
							<p
								className={`min-h-[10px] text-sm  h-[10px] ${
									serverError ? "text-center mt-2" : "text-end"
								} text-redColor`}
							>
								{errors?.password?.type == "required" ? "Esse campo é obrigatório" : ""}
								{errors?.password?.type == "minLength" ? "É necessário no mínimo 8 caracteres" : ""}
								{serverError ? serverError : ""}
							</p>
						</div>
						<div className="w-full">
							<label htmlFor="newPassword">Nova senha:</label>
							<div className="relative">
								<input
									id="newPassword"
									className="w-full px-8 bg-transparent border-2 border-primaryColor py-1  rounded-full"
									placeholder="Sua nova senha"
									type="password"
									{...register("newPassword", { required: true, minLength: 8 })}
								/>

								<MdOutlineLock size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
								<PasswordEye.newPassword
									onClick={() => showPassword("newPassword")}
									size={18}
									className="absolute top-2/4 right-3 translate-y-[-45%]"
								/>
							</div>
							<p
								className={`min-h-[10px] text-sm  h-[10px] ${
									serverError ? "text-center mt-2" : "text-end"
								} text-redColor`}
							>
								{errors?.newPassword?.type == "required" ? "Esse campo é obrigatório" : ""}
								{errors?.newPassword?.type == "minLength" ? "É necessário no mínimo 8 caracteres" : ""}
								{serverError ? serverError : ""}
							</p>
						</div>
						<div className="w-full">
							<label htmlFor="confirmNewPassword">Repita a nova senha:</label>
							<div className="relative">
								<input
									id="confirmNewPassword"
									className="w-full px-8 bg-transparent border-2 border-primaryColor py-1  rounded-full"
									placeholder="Repita sua nova senha"
									type="password"
									{...register("confirmNewPassword", {
										required: true,
										minLength: 8,

										validate: (val) => {
											if (watch("newPassword") != val) {
												return "As senhas não coincidem";
											}
										},
									})}
								/>

								<MdOutlineLock size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
								<PasswordEye.confirmNewPassword
									onClick={() => showPassword("confirmNewPassword")}
									size={18}
									className="absolute top-2/4 right-3 translate-y-[-45%]"
								/>
							</div>
							<p
								className={`min-h-[10px] text-sm  h-[10px] ${
									serverError ? "text-center mt-2" : "text-end"
								} text-redColor`}
							>
								{errors?.confirmNewPassword?.type == "required" ? "Esse campo é obrigatório" : ""}
								{errors?.confirmNewPassword?.type == "minLength" ? "É necessário no mínimo 8 caracteres" : ""}
								{errors?.confirmNewPassword?.type == "validate" ? "As senhas não coincidem" : ""}
								{serverError ? serverError : ""}
							</p>
						</div>
					</div>
					<button
						type="submit"
						onClick={handleSubmit(onSubmit)}
						className="bg-primaryColor border-2 border-primaryColor py-2 px-6 text-bgColor w-full rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Trocar senha
					</button>
				</form>

				<div className="sm:w-[360px] w-full sm:px-10">
					<h1 className="mb-6 w-full  sm:text-4xl text-2xl text-start font-bold">Configurações sensíveis</h1>

					<button
						onClick={() => setConfirmDelete(true)}
						className="bg-redColor border-2 border-redColor py-2 px-6 text-bgColor w-full rounded-full sm:hover:opacity-80  transition duration-300 text-sm"
					>
						Excluir Conta
					</button>
				</div>
			</main>

			{confirmDelete ? <ConfirmDelete message="sua conta" setConfirmDelete={setConfirmDelete} /> : undefined}

			<Footer />
		</>
	);
}
