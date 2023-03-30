import Link from "next/link";

export default function HeaderNoAuth() {
	return (
		<header className="w-full h-20 flex justify-between items-center">
			<Link href="/">
				<h1 className="sm:text-4xl text-2xl font-bold">
					finance<span className="text-primaryColor">Plan</span>
				</h1>
			</Link>

			<div className="flex justify-end items-center sm:gap-3 gap-2">
				<Link
					className="border-2 border-primaryColor py-1 sm:px-6 px-4 rounded-full sm:hover:opacity-80 transition duration-300 sm:text-base text-sm"
					href="/login"
				>
					Entrar
				</Link>
				<Link
					className="bg-primaryColor border-2 border-primaryColor py-1 sm:px-6 px-4 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm"
					href="/register"
				>
					Cadastrar
				</Link>
			</div>
		</header>
	);
}
