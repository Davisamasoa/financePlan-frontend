"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function HeaderAuth() {
	const [userMenu, setUserMenu] = useState<boolean>(false);

	return (
		<header className="w-full h-20 flex justify-between items-center">
			<Link href="/">
				<h1 className="sm:text-4xl text-2xl font-bold">
					finance<span className="text-primaryColor">Plan</span>
				</h1>
			</Link>

			<div className="relative flex justify-end items-center">
				<button onClick={() => setUserMenu(!userMenu)}>
					<FaUser className="text-primaryColor text-2xl" />
				</button>

				<span
					className={`${
						userMenu ? undefined : "hidden"
					} absolute border-[7px] border-transparent border-t-[7px] border-l-[7px] rotate-45 z-50 bg-transparent top-9 right-[6px] border-t-secondaryColor border-l-secondaryColor`}
				></span>
				<div
					className={` ${
						userMenu ? undefined : "hidden"
					} absolute top-10 flex justify-center  items-center gap-3 w-52 p-5 flex-col bg-secondaryColor rounded-lg`}
				>
					<Link href="/dashboard" className="sm:hover:opacity-75 transition duration-300">
						Dashboard
					</Link>
					<Link href="/account" className="sm:hover:opacity-75 transition duration-300">
						Configurações
					</Link>
					<button className="bg-primaryColor border-2 border-primaryColor py-1 px-3 text-bgColor rounded-full hover:bg-secondaryColor hover:text-textColor  transition duration-300 sm:text-base text-sm">
						Encerrar sessão
					</button>
				</div>
			</div>
		</header>
	);
}
