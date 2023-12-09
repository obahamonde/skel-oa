import Times from "./Times";
import Heading from "./Heading";
import TrendingItem from "./ThrendingItem";
import { Icon } from "@iconify/react";

const trending = [
  {
    key: 1,
    text: "Web3 platform",
    isSelected: true,
  },
  {
    key: 2,
    text: "Crypto",
    isSelected: false,
  },
  {
    key: 3,
    text: "AI",
    isSelected: false,
  },
  {
    key: 4,
    text: "How to invest in crypto",
    isSelected: false,
  },
  {
    key: 5,
    text: "What NFTs are popular now",
    isSelected: false,
  },
];

function Info() {
  return (
    <div className="border-l-2 border-l-line fixed right-0 top-0 h-screen w-80 bg-body z-10 p-3">
      <div className="flex justify-end">
        <Icon icon="mdi-close" className="w-5 h-5" />
      </div>
      <Heading text="Capabilities" />
      <div className="flex space-x-2">
        <div className="w-1/2 bg-card rounded-md p-2">
          <div className="w-9 h-9 rounded-full bg-brandOrange grid place-items-center">
            <Icon icon="mdi-star"  className="w-5 h-5 text-blue-900" />
          </div>
          <p className="mt-4 text-sm">
            Remember what user said earlier in the chat
          </p>
        </div>
        <div className="w-1/2 bg-card rounded-md p-2">
          <div className="w-9 h-9 rounded-full grid place-items-center bg-[#3a3a3c]">
            <Icon icon="mdi-star"  className="w-5 h-5 text-white" />
          </div>
          <p className="mt-4 text-sm">
            Allows users to provide follow-up corrections
          </p>
        </div>
      </div>
      <Heading text="Limitations" />
      <div className="flex space-x-2">
        <div className="w-1/2 bg-card rounded-md p-2">
          <div className="w-9 h-9 rounded-full bg-brandOrange grid place-items-center">
            <Icon icon="mdi-alert" className="w-5 h-5 text-blue-900" />
          </div>
          <p className="mt-4 text-sm">
            May occasionally provide incorrect information
          </p>
        </div>
        <div className="w-1/2 bg-card rounded-md p-2">
          <div className="w-9 h-9 rounded-full bg-[#3a3a3c] grid place-items-center">
            <Icon icon="mdi-alert"  className="w-5 h-5 text-white" />
          </div>
          <p className="mt-4 text-sm">Limited knowledge of world and events</p>
        </div>
      </div>
      <Heading text="Trending Topics" />
      <div className="flex flex-wrap">
        {trending.map((i) => (
          <TrendingItem item={i} key={i.key} />
        ))}
      </div>

      <div className="mt-6 bg-brandBlue rounded-md p-4">
        <div className="flex items-center justify-center font-semibold">
          <div className=""> Upgrade to </div>
          <div className="ml-2 uppercase bg-brandGreen text-blue-900 rounded-md px-2 py-0.5">
            plus
          </div>
        </div>
        <p className="text-sm px-4 mt-3 text-center text-[#a6aeea]">
          Get faster response speed, priority access to new features
        </p>
        <button className="w-full bg-[#3345c5] rounded-md mt-5 py-3 font-semibold border border-[#4b5cd7]">
          Buy ChatGPT PLUS
        </button>
      </div>
    </div>
  );
}


export default Info;