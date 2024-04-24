import SelectFilter from "./SelectFilter";

function FilterFull() {
  return (
    <div className="filter-content w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <SelectFilter
          title="Date"
          placeHolder="Filter"
          options={["January", "February", "March"]}
        />
        <SelectFilter
          title="Amount Spent"
          placeHolder="Filter"
          options={["January", "February", "March"]}
        />
       
        <SelectFilter
          title="Type of transaction"
          placeHolder="Filter"
          options={["January", "February", "March"]}
        />
      </div>
    </div>
  );
}

export default FilterFull;
