import BarChart from "../chart/BarChart";
import DateFilter from "../forms/DateFilter";
import { useContext } from "react";
import { ThemeContext } from "../layout";

function RevenueFlow() {
  const { theme } = useContext(ThemeContext);

  let month = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dataSetsLight = [
    {
      label: "My First Dataset",
      data: [1, 5, 2, 2, 6, 7, 8, 7, 3, 4, 1, 3],
      backgroundColor: [
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(112, 101, 225, 1)", // midPurple
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
      ],
      borderWidth: 0,
      borderRadius: 5,
    },
    {
      label: "My First Dataset 2",
      data: [5, 2, 4, 2, 5, 8, 3, 7, 3, 4, 1, 3],
      backgroundColor: [
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(139, 92, 246, 1)", // darkPurple
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
      ],
      borderWidth: 0,
      borderRadius: 5,
    },
    {
      label: "My First Dataset 3",
      data: [2, 5, 3, 2, 5, 6, 9, 7, 3, 4, 1, 3],
      backgroundColor: [
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(14, 165, 233, 1)", // babyBlue.dark
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
        "rgba(224, 242, 254, 1)", // babyBlue.light
      ],
      borderWidth: 0,
      borderRadius: 5,
    },
  ];
  let dataSetsDark = [
    {
      label: "My First Dataset",
      data: [1, 5, 2, 2, 6, 7, 8, 7, 3, 4, 1, 3],
      backgroundColor: [
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(112, 101, 225, 1)", // midPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
      ],
      borderWidth: 0,
      borderRadius: 5,
    },
    {
      label: "My First Dataset 2",
      data: [5, 2, 4, 2, 5, 8, 3, 7, 3, 4, 1, 3],
      backgroundColor: [
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(139, 92, 246, 1)", // darkPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
      ],
      borderWidth: 0,
      borderRadius: 5,
    },
    {
      label: "My First Dataset 3",
      data: [2, 5, 3, 2, 5, 6, 9, 7, 3, 4, 1, 3],
      backgroundColor: [
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(14, 165, 233, 1)", // babyBlue.dark
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
        "rgba(221, 214, 254, 0.3)", // lightPurple
      ],
      borderWidth: 0,
      borderRadius: 5,
    },
  ];

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === "" ? "rgba(243, 246, 255, 1)" : "rgba(34, 38, 46, 1)",
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
        gridLines: {
          zeroLineColor: "rgb(243, 246, 255, 1)",
        },
        ticks: {
          color: theme === "" ? "black" : "white",
          callback(value) {
            return `${value}% `;
          },
        },
      },
      x: {
        ticks: {
          color: theme === "" ? "black" : "white",
        },
        grid: {
          color: theme === "" ? "rgba(243, 246, 255, 1)" : "rgba(34, 38, 46, 1)",
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
        gridLines: {
          zeroLineColor: "rgb(243, 246, 255, 1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  };
  const data = {
    labels: month,
    datasets: theme === "" ? dataSetsLight : dataSetsDark,
  };

  return (
    <div className="flex w-full flex-col justify-between rounded-lg bg-white px-[24px] py-3 dark:bg-darkblack-600">
    <div className="mb-2 flex items-center justify-between border-b border-bgray-300 pb-2 dark:border-darkblack-400">
        <h3 className="text-xl font-bold text-bgray-900 dark:text-white sm:text-2xl">
          Balance Breakdown
        </h3>
        <div className="hidden items-center space-x-[28px] sm:flex">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-midPurple"></div>
            <span className="text-sm font-medium text-bgray-700 dark:text-bgray-50">
              Pending
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-babyBlue-dark"></div>
            <span className="text-sm font-medium text-bgray-700 dark:text-bgray-50">
              Signed
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-darkPurple"></div>
            <span className="text-sm font-medium text-bgray-700 dark:text-bgray-50">
              Lost
            </span>
          </div>
        </div>

        <DateFilter
          options={["Jan 11 - Jan 16", "Jan 12 - Jan 16", "Jan 13 - Jan 16"]}
        />
      </div>
      <div className="w-full h-[255px]">
        <BarChart options={options} data={data} />
      </div>
    </div>
  );
}

export default RevenueFlow;