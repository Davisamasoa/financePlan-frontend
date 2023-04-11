"use client";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import HeaderNoAuth from "@/components/layout/headerNoAuth";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

const api_url = process.env.NEXT_PUBLIC_API_URL;

type FormData = {
	email: string;
	password: string;
};

type EyeIconsType = {
	password: IconType;
};

type fetchPromiseReturnType = {
	success: boolean;
	message: string;
	token: string;
};

export default function Login() {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [serverError, setServerError] = useState<string | null>();

	const [PasswordEye, setPasswordEye] = useState<EyeIconsType>({
		password: AiOutlineEye,
	});

	function onSubmit(data: FormData): void {
		login(data);
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

	async function login(data: FormData) {
		setLoading(true);

		const body = { email: data.email, password: data.password };
		const request: fetchPromiseReturnType = await fetch(`${api_url}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		}).then((res) => res.json());

		if (!request.success) {
			setLoading(false);
			if (request.message == "O email não está verificado!") {
				router.push(`/verifyEmail?email=${data.email}`);
			} else {
				setServerError(request.message);

				setTimeout(() => {
					setServerError(null);
				}, 5000);
			}
		} else {
			const actualDate = new Date();
			actualDate.setDate(actualDate.getDate() + 30);
			const expireDate = actualDate.toUTCString();
			document.cookie = `token=${request.token};expires=${expireDate};path=/`;

			router.push(`/dashboard`);
		}
	}

	return (
		<>
			<HeaderNoAuth />

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
					<Link href="/forgetPassword">Esqueceu a senha?</Link>
					<button
						type="submit"
						onClick={handleSubmit(onSubmit)}
						className="w-full bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 text-base"
					>
						{loading ? <PulseLoader size={5} /> : "Entrar"}
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
