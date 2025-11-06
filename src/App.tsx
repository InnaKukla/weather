import React, { Suspense } from "react";
import HomePage from "./pages/HomePage/HomePage";
import Loader from "./shared/Loader/Loader";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HomePage />
    </Suspense>
  )
};
export default App;
