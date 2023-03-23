"use client";

import Footer from "@/components/footer";
import HeaderNoAuth from "@/components/headerNoAuth";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type FormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type EyeIconsType = {
	password: IconType;
	confirmPassword: IconType;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const [serverError, setServerError] = useState<string>();

	const [PasswordEye, setPasswordEye] = useState<EyeIconsType>({
		password: AiOutlineEye,
		confirmPassword: AiOutlineEye,
	});

	function showPassword(): void {
		const password: HTMLInputElement | null = document.querySelector("#password");
		if (password?.type == "password") {
			password.type = "text";
			setPasswordEye({ ...PasswordEye, password: AiOutlineEyeInvisible });
		} else {
			password?.type ? (password.type = "password") : undefined;
			setPasswordEye({ ...PasswordEye, password: AiOutlineEye });
		}
	}

	function showConfirmPassword(): void {
		const password: HTMLInputElement | null = document.querySelector("#confirmPassword");
		if (password?.type == "password") {
			password.type = "text";
			setPasswordEye({ ...PasswordEye, confirmPassword: AiOutlineEyeInvisible });
		} else {
			password?.type ? (password.type = "password") : undefined;
			setPasswordEye({ ...PasswordEye, confirmPassword: AiOutlineEye });
		}
	}

	function onSubmit(data: FormData) {
		console.log(data);
	}

	return (
		<>
			<HeaderNoAuth />

			{console.log(errors)}

			<main className="sm:mt-20  mt-14 flex flex-col gap-8 justify-center items-center w-full">
				<h1 className="text-5xl font-bold">Cadastro</h1>
				<form
					onSubmit={(e) => e.preventDefault()}
					className="sm:w-[360px]  w-full sm:p-10 p-8 rounded-lg bg-secondaryColor flex justify-center items-center gap-3 flex-col"
				>
					<div className="w-full">
						<label htmlFor="email">Nome:</label>
						<div className="relative">
							<input
								id="name"
								className="w-full pl-8 bg-transparent border-2 border-primaryColor py-1 px-6 rounded-full"
								placeholder="Fulano da Silva"
								{...register("name", { required: true })}
							/>
							<FiUser size={18} className="absolute top-2/4 left-3 translate-y-[-50%]" />
						</div>
						<p className="min-h-[10px] text-sm  h-[10px] text-end text-redColor">
							{errors?.email ? "Esse campo é obrigatório" : ""}
						</p>
					</div>

					<div className="w-full">
						<label htmlFor="email">Email:</label>
						<div className="relative">
							<input
								id="email"
								className="w-full pl-8 bg-transparent border-2 border-primaryColor py-1 px-6 rounded-full"
								placeholder="exemplo@email.com"
								type="email"
								{...register("email", {
									required: true,
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: "Email inválido",
									},
								})}
							/>
							<MdOutlineMailOutline size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
						</div>
						<p className="min-h-[10px] text-sm  h-[10px] text-end text-redColor">
							{errors?.email?.type == "required" ? "Esse campo é obrigatório" : ""}
							{errors?.email?.type == "pattern" ? "E-mail inválido" : ""}
						</p>
					</div>
					<div className="w-full">
						<label htmlFor="password">Senha:</label>
						<div className="relative">
							<input
								id="password"
								className="w-full px-8 bg-transparent border-2 border-primaryColor py-1  rounded-full"
								placeholder="Escreva sua senha"
								type="password"
								{...register("password", { required: true, minLength: 8 })}
							/>

							<MdOutlineLock size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
							<PasswordEye.password
								onClick={showPassword}
								size={18}
								className="absolute top-2/4 right-3 translate-y-[-45%]"
							/>
						</div>
						<p className="min-h-[10px] text-sm  h-[10px] text-end text-redColor">
							{errors?.password?.type == "required" ? "Esse campo é obrigatório" : ""}
							{errors?.password?.type == "minLength" ? "É necessário no mínimo 8 caracteres" : ""}
						</p>
					</div>

					<div className="w-full">
						<label htmlFor="confirmPassword">Confirme a senha:</label>
						<div className="relative">
							<input
								id="confirmPassword"
								className="w-full px-8 bg-transparent border-2 border-primaryColor py-1  rounded-full"
								placeholder="Reescreva sua senha"
								type="password"
								{...register("confirmPassword", {
									required: true,
									minLength: 8,

									validate: (val) => {
										if (watch("password") != val) {
											return "As senhas não coincidem";
										}
									},
								})}
							/>

							<MdOutlineLock size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
							<PasswordEye.confirmPassword
								onClick={showConfirmPassword}
								size={18}
								className="absolute top-2/4 right-3 translate-y-[-45%]"
							/>
						</div>
						<p
							className={`min-h-[10px] text-sm  h-[10px] ${
								serverError ? "text-center mt-2" : "text-end"
							} text-redColor`}
						>
							{errors?.confirmPassword?.type == "required" ? "Esse campo é obrigatório" : ""}
							{errors?.confirmPassword?.type == "minLength" ? "É necessário no mínimo 8 caracteres" : ""}
							{errors?.confirmPassword?.type == "validate" ? "As senhas não coincidem" : ""}
							{serverError ? serverError : ""}
						</p>
					</div>
					<p>Esqueceu a senha?</p>
					<button
						type="submit"
						onClick={handleSubmit(onSubmit)}
						className="w-full bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:bg-secondaryColor sm:hover:text-textColor  transition duration-300 text-base"
					>
						Cadastrar
					</button>
					<div className="text-center">
						<p>Já tem uma conta?</p>
						<Link href="/login" className="underline">
							Faça login aqui{" "}
						</Link>
					</div>
				</form>
			</main>
			<Footer />
		</>
	);
}
