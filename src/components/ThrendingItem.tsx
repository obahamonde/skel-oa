import { Icon } from "@iconify/react";


function TrendingItem({ item }) {
  return (
    <div className="p-1">
      <div
        className={`rounded-md text-sm font-semibold py-1 px-2 flex items-center  ${
          item.isSelected ? "bg-brandGreen text-blue-900" : "bg-card"
        }`}
      >
        {item.text}
        <Icon icon="mdi-trending-up"  className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}
export default TrendingItem;