"use client";
import Link from "next/link";
import Footer from "@/components/footer";
import HeaderNoAuth from "@/components/headerNoAuth";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { IconType } from "react-icons/lib";

type FormData = {
	email: string;
	password: string;
};

type EyeIconsType = {
	password: IconType;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [serverError, setServerError] = useState<string>();

	const [PasswordEye, setPasswordEye] = useState<EyeIconsType>({
		password: AiOutlineEye,
	});

	function onSubmit(data: FormData): void {
		console.log(data);
	}

	function showPassword(element: string): void {
		const password: HTMLInputElement | null = document.querySelector(`#${element}`);
		if (password?.type == "password") {
			password.type = "text";
			setPasswordEye({ password: AiOutlineEyeInvisible });
		} else {
			password?.type ? (password.type = "password") : undefined;
			setPasswordEye({ password: AiOutlineEye });
		}
	}

	return (
		<>
			<HeaderNoAuth />

			{console.log(errors)}

			<main className="min-h-[80vh] flex flex-col gap-8 justify-center items-center w-full">
				<h1 className="sm:text-5xl text-4xl font-bold">Login</h1>
				<form
					onSubmit={(e) => e.preventDefault()}
					className="sm:w-[360px] w-full sm:p-10 p-8 rounded-lg bg-secondaryColor flex justify-center items-center gap-1 flex-col"
				>
					<div className="w-full">
						<label htmlFor="email">Email:</label>
						<div className="relative">
							<input
								id="email"
								className="w-full pl-8 bg-transparent border-2 border-primaryColor py-1 px-6 rounded-full"
								placeholder="exemplo@email.com"
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
								placeholder="Sua senha"
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
							className={`min-h-[20px] text-sm ${
								serverError ? "text-center mt-2" : "text-end"
							} text-redColor`}
						>
							{errors?.password?.type == "required" ? "Esse campo é obrigatório" : ""}
							{errors?.password?.type == "minLength" ? "É necessário no mínimo 8 caracteres" : ""}
							{serverError ? serverError : ""}
						</p>
					</div>
					<p>Esqueceu a senha?</p>
					<button
						type="submit"
						onClick={handleSubmit(onSubmit)}
						className="w-full bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-base"
					>
						Cadastrar
					</button>
					<div className="text-center">
						<p>Não tem uma conta?</p>
						<Link href="/register" className="underline">
							Cadastre-se aqui{" "}
						</Link>
					</div>
				</form>
			</main>
			<Footer />
		</>
	);
}
