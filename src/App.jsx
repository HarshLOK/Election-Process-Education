import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ElectionLifecycle from "./components/ElectionLifecycle";
import ElectionTypes from "./components/ElectionTypes";
import Parliament from "./components/Parliament";
import HierarchyGraph from "./components/HierarchyGraph";
import DataDashboard from "./components/DataDashboard";
import SimulationMode from "./components/SimulationMode";
import QuizArena from "./components/QuizArena";
import LeaderInfo from "./components/LeaderInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="lifecycle" element={<ElectionLifecycle />} />
          <Route path="types" element={<ElectionTypes />} />
          <Route path="parliament" element={<Parliament />} />
          <Route path="hierarchy" element={<HierarchyGraph />} />
          <Route path="dashboard" element={<DataDashboard />} />
          <Route path="simulation" element={<SimulationMode />} />
          <Route path="quiz" element={<QuizArena />} />
          <Route path="leaders" element={<LeaderInfo />} />
          <Route path="*" element={<div className="p-12 text-muted font-mono flex items-center justify-center h-full">Module coming soon...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
