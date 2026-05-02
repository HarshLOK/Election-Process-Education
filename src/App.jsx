import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy load all main components to reduce initial bundle size
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const ElectionLifecycle = React.lazy(() => import("./components/ElectionLifecycle"));
const ElectionTypes = React.lazy(() => import("./components/ElectionTypes"));
const Parliament = React.lazy(() => import("./components/Parliament"));
const HierarchyGraph = React.lazy(() => import("./components/HierarchyGraph"));
const DataDashboard = React.lazy(() => import("./components/DataDashboard"));
const SimulationMode = React.lazy(() => import("./components/SimulationMode"));
const QuizArena = React.lazy(() => import("./components/QuizArena"));
const LeaderInfo = React.lazy(() => import("./components/LeaderInfo"));

// Fallback loader component
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center h-full w-full">
    <div className="w-12 h-12 border-4 border-[rgba(0,255,163,0.1)] border-t-primary rounded-full animate-spin"></div>
    <div className="mt-4 font-mono text-xs font-bold tracking-widest text-primary animate-pulse">LOADING MODULE...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
