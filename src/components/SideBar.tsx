import { Icon } from "@iconify/react";
import { useDark } from "~/hooks";



export default function Sidebar() {
  const { isDark, toggleDark } = useDark()
  return (
    <div className="bg-black fixed left-0 top-0 h-screen w-16 z-10 flex flex-col items-center pt-4">
      <div className="w-10 h-10 bg-brandGreen rounded-full shrink-0 grid place-items-center">
       <img src="/favicon.svg" alt="avatar" className="w-8 h-8 rounded-full cursor-pointer" />
      </div>
      <div className="grow flex flex-col space-y-4 pt-24">
        <button className="w-10 h-10 rounded-md grid place-items-center text-brandGray">
          <Icon icon="mdi-apps" className="icon" /> 
        </button>
        <button className="w-10 h-10 rounded-md grid place-items-center text-white bg-brandBlue">
          <Icon icon="mdi-chat" className="icon" />
        </button>
        <button className="w-10 h-10 rounded-md grid place-items-center text-brandGray">
          <Icon icon="mdi-account-multiple" className="icon" />
        </button>
        <button className="w-10 h-10 rounded-md grid place-items-center text-brandGray">
          <Icon icon="mdi-cog" className="icon" />
        </button>
      </div>
      <div className="shrink-0 pb-4 flex flex-col space-y-4">
        <button
          className="w-10 h-10 rounded-md grid place-items-center "
          style={{ color: "#b0a569" }}
        >
          <Icon icon={isDark ? "mdi-white-balance-sunny" : "mdi-moon-waxing-crescent"} className="icon" onClick={toggleDark} />
        </button>
        <button className="w-10 h-10 rounded-md grid place-items-center text-white bg-card " >
          <Icon icon="mdi-logout" className="icon" />
        </button>
      </div>
    </div>
  );
}