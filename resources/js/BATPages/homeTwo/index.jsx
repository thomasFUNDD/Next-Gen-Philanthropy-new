import ListTab from "../../Components/BATComponents/listTab";
import Wallet from "../../Components/BATComponents/wallet";
import Calender from "../../Components/BATComponents/calender";
import TotalWidgetV2 from "../../Components/BATComponents/widget/TotalWidgetV2";
import Efficiency from "../../Components/BATComponents/revenueFlow/Efficiency";
import Summary from "../../Components/BATComponents/summary";
import Location from "../../Components/BATComponents/summary/Location";

function HomeTwo() {
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          <div className="w-full mb-[24px] xl:flex xl:space-x-[24px]">
            <TotalWidgetV2 />
            <Efficiency height="h-[180px]" />
          </div>
          <div className="w-full mb-[24px] flex space-x-[24px]">
            <Summary />
            <Location />
          </div>

          <ListTab />
        </section>
        <section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 2xl:w-[400px] 2xl:flex-col 2xl:space-x-0">
          <Wallet />
          <Calender />
        </section>
      </div>
    </main>
  );
}

export default HomeTwo;
