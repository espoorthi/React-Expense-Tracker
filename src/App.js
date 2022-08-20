import "./App.css";
import { useState } from "react";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Popup from "./components/Popup";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ToggleButton from "./components/ToggleButton";
import { useContext } from "react";
import mainContext from "./context/context";

function App() {
  const [mode, setMode] = useState(false);
  const ctx = useContext(mainContext);

  
  const onChangeHandler = (e) => {
    setMode(e.target.checked);
  };



  return (
      <div className={`App ${mode ? "dark" : ""}`}>
        <main className="main">
          <div className="toggle-button-container">
            <ToggleButton onChange={onChangeHandler} />
          </div>
          <Navbar />
          <section className="section">
            <Routes>
              <Route path="/" element={<Expenses />} />
              <Route path="/statistics" element={<Statistics mode={mode} />} />
            </Routes>
          </section>
        </main>
        {ctx.popupOptions.enable ?  <Popup closePopup={ctx.closePopup} heading={ctx.popupOptions.heading} message={ctx.popupOptions.message} /> : ''}
      </div>
    
  );
}

export default App;
