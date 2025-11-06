import React, { Suspense, lazy } from "react";
import Loader from "./shared/Loader/Loader";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HomePage />
    </Suspense>
  )
};
export default App;
