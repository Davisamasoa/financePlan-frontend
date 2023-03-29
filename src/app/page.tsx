import Footer from "@/components/layout/footer";
import HeaderNoAuth from "@/components/layout/headerNoAuth";
import Image from "next/image";
import Link from "next/link";
import svg from "../assets/Personal-finance.svg";

export default function Index() {
	return (
		<>
			<HeaderNoAuth />
			<main className="min-h-[80vh] flex justify-between items-center lg:flex-row flex-col sm:gap-0 gap-10">
				<div className="flex justify-center items-start flex-col gap-5">
					<h1 className="sm:text-4xl text-2xl font-bold">
						Querendo organizar suas finanças? <br /> Use o financePlan!
					</h1>
					<p className="text-white sm:text-2xl font-light">
						Aqui você pode organizar suas finanças sem precisar de planinha. <br /> Se organize para sobrar
						aquele dinheirinho no final do mês <br /> para conquistar seus objetivos.
					</p>
					<Link
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm"
						href=""
					>
						Cadastrar
					</Link>
				</div>
				<figure>
					<Image
						className="sm:max-w-md w-full"
						src={svg}
						alt="imagem de um homem segurando um cofre de porquinho"
						width={500}
					/>
				</figure>
			</main>

			<Footer />
		</>
	);
}
