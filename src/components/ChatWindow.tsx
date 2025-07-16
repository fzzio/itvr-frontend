import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

export default function ChatWindow() {
  return (
    <div className="lg:col-span-3 flex flex-col bg-white rounded-lg shadow">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}
