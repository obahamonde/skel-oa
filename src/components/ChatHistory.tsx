import Item from "./Item";
import { Icon } from "@iconify/react";
import { useDark } from "~/hooks";

const pinned = [
  {
    key: 1,
    title: "Benevolentia paciscor propinquus",
    desc: "Concilium munimentum curis competo sanctifico iaculator",
    date: "12 Jan",
    isSelected: false,
  },
  {
    key: 2,
    title: "Mollis furs sapiens",
    desc: "Andegavense infigo edoceo prohibeo vultuosus aer hactenus glorior informatio",
    date: "9 Mar",
    isSelected: true,
  },
];

const all = [
  {
    key: 1,
    title: "Transmitto pario dignitas",
    desc: "Promoveo lenocinor treverim etiam natio vespillo plaustrum eximius adicio iugis efficio ille",
    date: "21 Aug",
    isSelected: false,
  },
  {
    key: 2,
    title: "Gemblacensis intumesco adipiscor",
    desc: "Nitor articulus rhetor spolium insula hanc dedecus expedio spargo lasesco furor",
    date: "2 Dec",
    isSelected: false,
  },
  {
    key: 3,
    title:
      "Sustineo locupleto prohibeo testimonium epistula quaestio recito fugio defleo comedo pollicitus cedo",
    desc: "Commessatio intus paciscor redigo forte exspecto inflo mores, frux, ex",
    date: "15 Apr",
    isSelected: false,
  },
  {
    key: 4,
    title:
      "Macto parilis macero castellandum patria proinde demitto molestia ficus malum",
    desc: "Adulescentia nutus vestis pevela pertimesco procella berlinmonte quodammodo quartus nutrimens claro",
    date: "20 May",
    isSelected: false,
  },
];

function ChatHistory() {
  const { isDark }= useDark();
  return (
    <div className="fixed left-16 top-0 h-screen w-80 border-r-2 border-r-line bg-body z-10 flex flex-col px-2">
      <div className="shrink-0 px-3 flex items-center py-3">
        <h2 className="shrink-0 text-lg font-semibold ">Chats</h2>
        <div className="shrink-0 w-8 h-8 rounded-full bg-brandBlue ml-2 grid place-items-center text-sm font-semibold">
          24
        </div>
        <div className="grow"> </div>
        <button className="">
          <Icon icon="mdi-dots-vertical" className="w-7 h-7 icon" />
        </button>
      </div>
      <div className="shrink-0 flex px-3 space-x-2">
        <div className="h-10 grow rounded-md bg-card relative">
          <input className="h-10 w-full rounded-md bg-card pl-4 pr-10" />
          <div className="absolute right-0 w-10 inset-y-0 grid place-items-center">
            <Icon icon="mdi-magnify" className="w-5 h-5 text-brandGray icon" />
          </div>
        </div>
        <div className="h-10 w-10 rounded-md bg-brandOrange grid  place-items-center shrink-0">
          <Icon icon="mdi-pencil-box-outline" className="w-5 h-5 text-brandBlue" />
        </div>
      </div>
      <div className="shrink-0 uppercase px-3 mt-4 mb-1 flex items-center">
        <Icon icon="mdi-pound" className="w-5 h-5" />
        <span className="ml-2 text-sm font-semibold">pinned</span>
      </div>
      <div className="shrink-0">
        {pinned.map((item) => (
          <Item item={item} key={item.key} />
        ))}
      </div>
      <div className="shrink-0 uppercase px-3 mt-4 mb-1 flex items-center">
        <Icon icon="mdi-lambda" className="w-5 h-5" />
        <span className="ml-2 text-sm font-semibold">all</span>
      </div>
      <div className="grow overflow-x-hidden overflow-y-auto">
        {all.map((item) => (
          <Item item={item} key={item.key} />
        ))}
      </div>
      <div className="shrink-0 px-2 py-3">
        <button
          className="w-full py-2 text-sm rounded-md font-semibold bg-card flex justify-center items-center"
          onClick={() => {}}
        >
          <Icon icon="mdi-cog" className="w-5 h-5" />
          <span className="ml-2">{isDark ? 'D':'L'}</span>
        </button>
      </div>
    </div>
  );
}

export default ChatHistory;