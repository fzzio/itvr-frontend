import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 to-amber-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar />
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
