

import { Icon } from "@iconify/react";
function Heading({ text }) {
  return (
    <div className="flex items-center justify-between mt-3 mb-1">
      <h3 className="text-md">{text}</h3>
      <Icon icon="mdi-dots-vertical" className="w-7 h-7 icon" />
    </div>
  );
}


export default Heading;