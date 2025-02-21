import { useRef, useEffect } from "react";

const InputArea = ( {chatDetails} ) => {

  const [myMessage, setMyMessage] = chatDetails.mine
  const [send, setSend] = chatDetails.send
  const [appAction, setAppAction] = chatDetails.appAction
  const [AIReady, setAIReady] = chatDetails.AIReady
  
  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };
    
    textarea.addEventListener("input", resizeTextarea);
    
    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        handleSubmit(e);
      }
    }
  };
  
  function handleSubmit(e){
    if(!textareaRef.current.value.trim())return
    e.preventDefault()
    setSend(true)

    textareaRef.current.value = ''
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
  }

  function selectAction(action){
    setAppAction(action)
  }

  return (
    <div className=" h-fit bg-[#303030] mx-3 rounded-[24px] p-3 flex flex-col justify-between gap-3 mt-3">

      <div className="flex w-full" >
        <textarea disabled={!AIReady} className="flex-1 max-h-20 text-lg focus:outline-0 text-wrap resize-none disabled:placeholder:opacity-20 disabled:cursor-not-allowed" type="text" placeholder="Start Typing!" rows={1} ref={textareaRef} onChange={e=>{setMyMessage(e.target.value)}} onKeyDown={e=>handleKeyDown(e)}>

        </textarea>

        <div className="items-stretch flex flex-col">
          <div className="flex-1"></div>
          <button disabled={!AIReady} className="size-7 p-1 cursor-pointer disabled:opacity-20" onClick={e=>handleSubmit(e)}>
            <img src="icons/paper-plane-solid.svg" alt="" />
          </button>
        </div>
      </div>

      <div className="flex gap-2">

        <label htmlFor="detect" className="cursor-pointer flex gap-1 items-center justify-center rounded-full border border-[#9a9a9a] px-2 py-1 hover:bg-white/80 transition-colors duration-300 h-fit" onChange={()=>selectAction('detect')}>

          <input disabled={!AIReady} type="radio" name="action" id="detect"/>

          <div className="size-4 p-[2px] flex items-center justify-center">
            <img src="icons/user-secret-solid.svg" alt="" />
          </div>
          <p className="text-[10px] font-semibold text-[#9a9a9a]">
            Detect
          </p>
        </label>

        <label htmlFor="translate" className="cursor-pointer flex gap-1 items-center justify-center rounded-full border border-[#9a9a9a] px-2 py-1 hover:bg-white/80 transition-colors duration-300 h-fit" onChange={()=>selectAction('translate')}>

          <input disabled={!AIReady} type="radio" name="action" id="translate"/>

          <div className="size-4 flex items-center justify-center">
            <img src="icons/language-solid.svg" alt="" />
          </div>
          <p className="text-[10px] font-semibold text-[#9a9a9a]">
            Translate
          </p>
        </label>

        <label htmlFor="summarize" className="cursor-pointer flex gap-1 items-center justify-center rounded-full border border-[#9a9a9a] px-2 py-1 hover:bg-white/80 transition-colors duration-300 h-fit" onChange={()=>selectAction('summarize')}>

          <input disabled={!AIReady} type="radio" name="action" id="summarize"/>

          <div className="size-4 flex items-center justify-center">
            <img src="icons/rectangle-list-solid.svg" alt="" />
          </div>
          <p className="text-[10px] font-semibold text-[#9a9a9a]">
            Summarize
          </p>
        </label>

      </div>
    </div>
  )
}

export default InputArea
