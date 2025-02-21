import { TypeAnimation } from "react-type-animation";
import ReactDOM from "react-dom/client";
import React from "react";

function renderResponse(msg, ref, language) {
  const newDiv = document.createElement("div");

  newDiv.classList.add(
    "self-start",
    "p-2",
    "px-3",
    "ml-3",
    "max-w-[80%]",
    "mt-3"
  );

  if (language) {
    msg = `${language}: ${msg}`;
    newDiv.classList.remove("mt-3");
    newDiv.classList.add("w-[80%]", "bg-white/25");
  }  
  ref.current.appendChild(newDiv);
  
  const root = ReactDOM.createRoot(newDiv);
  root.render(
    React.createElement(TypeAnimation, {
      sequence: [msg],
      cursor: false,
      speed: 80,
      repeat: 0
    })
  );

  setTimeout(() => {
    ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, 50);
}

export default renderResponse;
