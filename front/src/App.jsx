import { useEffect } from "react";
import "./App.css";
import { useTalkStore } from "./store/useTalksStore";
import Form from "./components/Form";
import Talks from "./components/Talks";

function App() {

  return (
    <div className="bg-[#f4f1ee] font-sans min-h-screen p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form />
        <Talks />
      </div>
    </div>
  );
}

export default App;
