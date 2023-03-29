import { BsLinkedin, BsGithub } from "react-icons/bs";

export default function Footer() {
	return (
		<footer className="absolute bottom-4 w-[250px] left-2/4 -translate-x-[50%] mx-auto flex flex-col justify-center items-center gap-1">
			<p className="font-light">Desenvolvido por Davi Samuel</p>
			<div className="flex gap-1">
				<a
					className="hover:opacity-80 transition duration-300"
					target="_blank"
					href="https://github.com/Davisamasoa"
				>
					<BsGithub size={21} />
				</a>
				<a
					className="hover:opacity-80 transition duration-300"
					target="_blank"
					href="https://www.linkedin.com/in/davisamasoa"
				>
					<BsLinkedin size={21} />
				</a>
			</div>
		</footer>
	);
}
