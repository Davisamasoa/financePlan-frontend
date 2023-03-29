import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#D8C7DF";

type ChartDataType = {
	balance: number;
	exit: number;
};

export default function Chart({ balance, exit }: ChartDataType) {
	const data: ChartData<"pie"> = {
		labels: ["Saldo", "Saída"],

		datasets: [
			{
				label: "R$",
				data: [balance, exit],
				backgroundColor: ["rgba(54, 231, 103, .8)", "rgba(227, 66, 66, .8)"],
				borderColor: ["rgba(54, 231, 103, 1)", "rgba(227, 66, 66, 1)"],
				borderWidth: 1,
			},
		],
	};

	return <Pie data={data} className="chart" />;
}
