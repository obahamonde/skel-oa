

function Item({ item }) {
  return (
    <div className="py-1">
      <div
        className={`px-3 py-2 text-sm w-full rounded-md ${
          item.isSelected ? "bg-card" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="grow font-semibold line-clamp-1">{item.title}</h3>
          <span className="shrink-0 pl-2">{item.date}</span>
        </div>

        <p
          className={`line-clamp-2 mt-1 ${
            item.isSelected ? "text-white" : "text-brandGray"
          }`}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default Item;