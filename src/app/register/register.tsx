"use client";

import Footer from "@/components/layout/footer";
import HeaderNoAuth from "@/components/layout/headerNoAuth";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/navigation";

const api_url = process.env.NEXT_PUBLIC_API_URL;

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

type fetchPromiseReturnType = {
	success: boolean;
	message: string;
};

export default function Register() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const [serverError, setServerError] = useState<string | null>();

	const [PasswordEye, setPasswordEye] = useState<EyeIconsType>({
		password: AiOutlineEye,
		confirmPassword: AiOutlineEye,
	});

	function showPassword(element: string): void {
		const password: HTMLInputElement | null = document.querySelector(`#${element}`);
		if (password?.type == "password") {
			password.type = "text";
			element == "password"
				? setPasswordEye({ ...PasswordEye, password: AiOutlineEyeInvisible })
				: setPasswordEye({ ...PasswordEye, confirmPassword: AiOutlineEyeInvisible });
		} else {
			password?.type ? (password.type = "password") : undefined;
			element == "password"
				? setPasswordEye({ ...PasswordEye, password: AiOutlineEye })
				: setPasswordEye({ ...PasswordEye, confirmPassword: AiOutlineEye });
		}
	}

	function onSubmit(data: FormData) {
		createUser(data);
	}

	async function createUser(data: FormData) {
		const body = { name: data.name, email: data.email, password: data.password };
		const request: fetchPromiseReturnType = await fetch(`${api_url}/user`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		}).then((res) => res.json());

		if (!request.success) {
			setServerError(request.message);
			setTimeout(() => {
				setServerError(null);
			}, 5000);
		} else {
			router.push(`/verifyEmail?email=${body.email}`);
		}
	}

	return (
		<>
			<HeaderNoAuth />

			<main className="min-h-[80vh] flex flex-col gap-8 justify-center items-center w-full">
				<h1 className="sm:text-5xl text-4xl font-bold">Cadastro</h1>
				<form
					onSubmit={(e) => e.preventDefault()}
					className="sm:w-[360px] w-full sm:p-10 p-8 rounded-lg bg-secondaryColor flex justify-center items-center gap-1 flex-col"
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
						<p className="min-h-[20px] text-sm text-end text-redColor">
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
						<p className="min-h-[20px] text-sm text-end text-redColor">
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
								onClick={() => showPassword("password")}
								size={18}
								className="absolute top-2/4 right-3 translate-y-[-45%]"
							/>
						</div>
						<p className="min-h-[20px] text-sm text-end text-redColor">
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
								onClick={() => showPassword("confirmPassword")}
								size={18}
								className="absolute top-2/4 right-3 translate-y-[-45%]"
							/>
						</div>
						<p
							className={`min-h-[20px] text-sm mt-2 ${
								serverError ? "text-center" : "text-end"
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
						className="w-full bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80 transition duration-300 text-base"
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
