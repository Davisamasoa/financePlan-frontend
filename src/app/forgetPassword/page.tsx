"use client";

import Footer from "@/components/layout/footer";
import HeaderNoAuth from "@/components/layout/headerNoAuth";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const api_url = process.env.NEXT_PUBLIC_API_URL;

type fetchPromiseReturnType = {
	success: boolean;
	message: string;
};

type FormData = {
	password: string;
	confirmPassword: string;
};

type EyeIconsType = {
	password: IconType;
	confirmPassword: IconType;
};

export default function VerifyEmail() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const [sendCodeToEmail, setSendCodeToEmail] = useState<boolean>(true);
	const [emailinputValue, setEmailInputValue] = useState<string | undefined>("");
	const [codeInputvalue, setCodeInputvalue] = useState<string | undefined>("");

	const [serverError, setServerError] = useState<string | null>();

	const [PasswordEye, setPasswordEye] = useState<EyeIconsType>({
		password: AiOutlineEye,
		confirmPassword: AiOutlineEye,
	});

	async function sendCodeToEmailFn() {
		const body = { email: emailinputValue };

		const request: fetchPromiseReturnType = await fetch(`${api_url}/forgetPassword`, {
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
			setSendCodeToEmail(false);
		}
	}

	async function changePassword(data: FormData) {
		const body = { email: emailinputValue, code: codeInputvalue, password: data.password };
		const request: fetchPromiseReturnType = await fetch(`${api_url}/forgetPassword`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		}).then((res) => res.json());

		if (!request.success) {
			setServerError(request.message);
			setTimeout(() => {
				setServerError(null);
			}, 5000);
		} else {
			router.push(`/login`);
		}
	}

	function handleEmailInputValue(e: React.FormEvent<HTMLInputElement>) {
		setEmailInputValue(e.currentTarget.value);
	}

	function handleCodeInputValue(e: React.FormEvent<HTMLInputElement>) {
		setCodeInputvalue(e.currentTarget.value);
	}

	function onSubmit(data: FormData) {
		changePassword(data);
	}

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

	return (
		<>
			<HeaderNoAuth />

			<main className="min-h-[80vh] flex flex-col gap-8 justify-center items-center w-full">
				<h1 className="sm:text-5xl text-4xl font-bold">Trocar senha</h1>
				<form
					onSubmit={(e) => e.preventDefault()}
					className="sm:w-[360px] w-full sm:p-10 p-8 rounded-lg bg-secondaryColor flex justify-center items-center gap-3 flex-col"
				>
					<div className="w-full">
						<label htmlFor="email">Email:</label>
						<div className="relative">
							<input
								id="email"
								className="w-full pl-8 bg-transparent border-2 border-primaryColor py-1 px-6 rounded-full"
								placeholder="exemplo@email.com"
								onChange={handleEmailInputValue}
								value={emailinputValue}
							/>
							<MdOutlineMailOutline size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
						</div>
						<p className="min-h-[10px] text-sm  h-[10px] text-end text-redColor">
							{sendCodeToEmail ? (serverError ? serverError : "") : undefined}
						</p>
					</div>
					{sendCodeToEmail ? (
						<>
							<button
								type="submit"
								onClick={sendCodeToEmailFn}
								className="w-full bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-base"
							>
								Enviar código de verificação
							</button>
						</>
					) : (
						<>
							<div className="w-full">
								<label htmlFor="code">Código:</label>
								<div className="relative">
									<input
										id="code"
										onChange={handleCodeInputValue}
										value={codeInputvalue}
										className="w-full pl-8 bg-transparent border-2 border-primaryColor py-1 px-6 rounded-full"
										placeholder="Insira o código que foi enviado para o seu e-mail"
									/>
									<MdOutlineMailOutline size={18} className="absolute top-2/4 left-3 translate-y-[-45%]" />
								</div>
							</div>

							<div className="w-full">
								<label htmlFor="password">Nova Senha:</label>
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
								<label htmlFor="confirmPassword">Confirme sua nova senha:</label>
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

							<button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								className="w-full bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80 transition duration-300 text-base"
							>
								Trocar senha
							</button>
							<button
								onClick={sendCodeToEmailFn}
								className="w-full  py-1 px-6 text-textColor rounded-full sm:hover:opacity-80  transition duration-300 text-base"
							>
								Enviar código novamente
							</button>
						</>
					)}
				</form>
			</main>
			<Footer />
		</>
	);
}
