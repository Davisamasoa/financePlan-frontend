import Footer from "@/components/layout/footer";
import HeaderNoAuth from "@/components/layout/headerNoAuth";
import Image from "next/image";
import Link from "next/link";
import svg from "../assets/Personal-finance.svg";

export default function Index() {
	return (
		<>
			<HeaderNoAuth />
			<main className="min-h-[80vh] mt-10 lg:mt-0 flex justify-between items-center lg:flex-row flex-col sm:gap-0 gap-10">
				<div className="flex justify-center items-start flex-col gap-5 w-full md:w-fit">
					<h1 className="sm:text-4xl text-2xl font-bold">
						Querendo organizar suas finanças? <br /> Use o financePlan!
					</h1>
					<p className="text-white sm:text-xl font-light">
						Aqui você pode organizar suas finanças sem precisar de planilha. <br /> Se organize para sobrar
						aquele dinheirinho no final do mês <br /> para conquistar seus objetivos.
					</p>
					<Link
						className="bg-primaryColor border-2 border-primaryColor py-1 px-6 text-bgColor rounded-full sm:hover:opacity-80  transition duration-300 sm:text-base text-sm"
						href="/register"
					>
						Cadastrar
					</Link>
				</div>
				<figure>
					<Image
						className="sm:max-w-md w-full"
						src={svg}
						alt="imagem de um homem segurando um cofre de porquinho"
						width={600}
					/>
				</figure>
			</main>

			<Footer />
		</>
	);
}
