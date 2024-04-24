import ProtoTypes from "prop-types";
import LineChart from "../chart/LineChart";
import { useEffect } from "react";
import { useRef } from "react";

const createGradient = (ctx) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(139, 92, 246, 0.41)"); // darkPurple with opacity
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0)");
  return gradient;
};

function TotalWidgetCard({ title, amount, groth, memberImg, totalEarnImg, total }) {
  const chartRef = useRef(null);

 
  useEffect(() => {
    // Get canvas context and create gradient
    const ctx = chartRef?.current?.getContext("2d")?.chart.ctx;
    if (ctx) {
      const gradient = createGradient(ctx);
      // Update chart data and options
      chartRef.current.data.datasets[0].backgroundColor = gradient;
      chartRef.current.update();
    }
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Visitor: 2k",
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Afril",
    "May",
    "Jan",
    "Feb",
    "Mar",
    "Afril",
    "May",
    "Feb",
    "Mar",
    "Afril",
    "May",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [0, 10, 0, 65, 0, 25, 0, 35, 20, 100, 40, 75, 50, 85, 60],
        label: "Visitor",
        borderColor: "#8b5cf6", // darkPurple
        pointRadius: 0,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8b5cf6", // darkPurple
        borderWidth: 1,
        fill: true,
        fillColor: "#fff",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="rounded-lg bg-white p-5 dark:bg-purple-dark">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center space-x-[7px]">
          <div className="icon">
            <span>
              <img src={totalEarnImg} alt="icon" />
            </span>
          </div>
          <span className="text-lg font-semibold text-bgray-900 dark:text-babyBlue-light">
            {title}
          </span>
        </div>
      
      </div>
      <div className="flex items-end justify-between">
      <div className="flex-1">
      {amount !== "na" ? (
      <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-babyBlue-light">
        £{amount}
      </p>
    ) : (
      <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-babyBlue-light">
        {total}
      </p>
    )}
          <div className="flex items-center space-x-1">
          
        
          </div>
        </div>
        {/* <div className="w-[106px] h-[68px]">
          <LineChart option={options} dataSet={data} refer={chartRef} />
        </div> */}
      </div>
    </div>
  );
}

TotalWidgetCard.propTypes = {
  title: ProtoTypes.string,
  amount: ProtoTypes.string,
  total: ProtoTypes.string,
  groth: ProtoTypes.string,
  memberImg: ProtoTypes.string,
  totalEarnImg: ProtoTypes.string,
};

export default TotalWidgetCard;