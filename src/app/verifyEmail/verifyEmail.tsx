"use client";

import Footer from "@/components/layout/footer";
import HeaderNoAuth from "@/components/layout/headerNoAuth";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

const api_url = process.env.NEXT_PUBLIC_API_URL;

type fetchPromiseReturnType = {
	success: boolean;
	message: string;
	token: string;
};

export default function VerifyEmail() {
	const router = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();
	const queryEmail: any = searchParams.get("email");

	const [sendCodeToEmail, setSendCodeToEmail] = useState<boolean>(true);
	const [emailinputValue, setEmailInputValue] = useState<string | number | readonly string[] | undefined>(
		queryEmail
	);
	const [codeInputvalue, setCodeInputvalue] = useState<string | undefined>("");

	const [serverError, setServerError] = useState<string | null>();

	async function sendCodeToEmailFn() {
		const body = { email: emailinputValue };

		const request: fetchPromiseReturnType = await fetch(`${api_url}/verifyEmail`, {
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

			setServerError("O código foi enviado para o seu e-mail");
			setTimeout(() => {
				setServerError(null);
			}, 2000);
		}
	}

	async function login() {
		const body = { email: emailinputValue, code: codeInputvalue };
		const request: fetchPromiseReturnType = await fetch(`${api_url}/verifyEmail`, {
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
			const actualDate = new Date();
			actualDate.setDate(actualDate.getDate() + 30);
			const expireDate = actualDate.toUTCString();
			document.cookie = `token=${request.token};expires=${expireDate};path=/`;

			router.push(`/dashboard`);
		}
	}

	function handleEmailInputValue(e: React.FormEvent<HTMLInputElement>) {
		setEmailInputValue(e.currentTarget.value);
	}

	function handleCodeInputValue(e: React.FormEvent<HTMLInputElement>) {
		setCodeInputvalue(e.currentTarget.value);
	}

	return (
		<>
			<HeaderNoAuth />

			<main className="min-h-[80vh] flex flex-col gap-8 justify-center items-center w-full">
				<h1 className="sm:text-5xl text-4xl font-bold">Verificar email</h1>
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

					{}

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
								<p
									className={`min-h-[10px] text-sm  h-[10px] text-end ${
										serverError == "O código foi enviado para o seu e-mail"
											? "text-greenColor"
											: "text-redColor"
									}`}
								>
									{serverError ? serverError : ""}
								</p>
							</div>
							<button
								onClick={login}
								className="w-full bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-base"
							>
								Verificar
							</button>
							<button
								type="submit"
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
