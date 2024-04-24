import totalEarn from "../../../assets/images/icons/total-earn.svg";
import memberImg from "../../../assets/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";

function TotalWidget({ balance, standingOrders }) {

  console.log("FDSF",{ balance }, { standingOrders });

  console.log("FDSF", standingOrders.filter(item => item.accountno == 146).length);


  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 xl:grid-cols-3">
      <TotalWidgetCard
  totalEarnImg={totalEarn}
  memberImg={memberImg}
  title="Total Balance"
  amount={JSON.stringify(balance)}
  id="totalEarn"
/>

        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Spending"
          amount="7,245.00"
          growth="+ 3.5%"
          id="totalSpending"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Standing Orders"
          amount="na"
          total={JSON.stringify(standingOrders.filter(item => item.accountno == 146).length)}
          growth="+ 3.5%"
          id="totalGoal"
        />
      </div>
    </div>
  );
}

export default TotalWidget;