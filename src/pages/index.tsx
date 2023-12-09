
import Sidebar from "../components/Sidebar";
import ChatHistory from "../components/ChatHistory";
import ChatHeader from "../components/ChatHeader";
import Chat from "../components/Chat";
import ChatInput from "../components/ChatInput";
import Info from "../components/Info";


export default function Index() {
  return (
    <>
       <Sidebar />
      <ChatHistory />
      <ChatHeader />
      <Chat />
      <ChatInput />
      <Info />
    </>);
}
