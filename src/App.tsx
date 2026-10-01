import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detials from "./pages/Detials";

function App() {

  return (
    <main className="flex flex-col bg-(--bg-color) transition-colors duration-200 w-full min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detials />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
