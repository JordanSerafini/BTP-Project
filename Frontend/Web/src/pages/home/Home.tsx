import { useState } from "react";
import MessagePage from "../MessagePage/MessagePage";

function Home() {
  const [content, setContent] = useState<string>("");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      {content === "message" ? (
        <MessagePage />
      ) : (
        <div
          className="bg-blue-100 cursor-pointer p-4 rounded-md"
          onClick={() => setContent("message")}
        >
          Message page
        </div>
      )}
    </div>
  );
}

export default Home;
