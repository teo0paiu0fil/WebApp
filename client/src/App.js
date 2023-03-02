import React from "react";
import './App.css'
import { Article, Brand, Cta, Navbar } from "./components";

const App = () => {
  return (
    <>
      <Navbar />
      <h1>WebApp</h1>
      <Brand />
      <Article />
      <Cta/>
    </>
  );
};

export default App;
