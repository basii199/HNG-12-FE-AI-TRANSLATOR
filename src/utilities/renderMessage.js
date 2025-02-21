function renderMessage (msg, ref){
  const newDiv = document.createElement("div");
  newDiv.classList.add(
    "self-end",
    "p-2",
    "px-3",
    "bg-[#303030]",
    "mr-3",
    "rounded-[20px]",
    "max-w-[75%]",
    "mt-3"
  );
  newDiv.innerText = msg;

  ref.current.append(newDiv);

  ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
}

export default renderMessage