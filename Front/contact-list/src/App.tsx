import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import People from "./pages/People";
import MainAppBar from "./components/MainAppBar";
import UpsertPerson from "./pages/UpsertPerson";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<People />} />
          <Route path="/edit">
            <Route
              path=":personId"
              element={<UpsertPerson />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
