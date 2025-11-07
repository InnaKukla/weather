import React, { Suspense, lazy } from "react";
import Loader from "./shared/Loader/Loader";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/weather" element={<HomePage />} />
        <Route path="*" element={<h1 className="font-medium text-[46px] text-center mt-[20%]">404 Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};
export default App;
