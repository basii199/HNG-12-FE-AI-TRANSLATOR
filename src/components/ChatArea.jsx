import { useRef, useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import { TypeAnimation } from 'react-type-animation';
import BeatLoader from "react-spinners/BeatLoader";


import summarize from "../utilities/summarize";
import renderMessage from "../utilities/renderMessage";
import renderResponse from "../utilities/renderResponse";
import detectLanguage from "../utilities/detectLanguage";
import translateMessage from "../utilities/translateMessage";
import TranslateOptions from "./TranslateOptions";

const ChatArea = ({ chatDetails }) => {
  const chatAreaRef = useRef(null);

  const [myMessage, setMyMessage] = chatDetails.mine;
  const [send, setSend] = chatDetails.send;
  const [appAction, setAppAction] = chatDetails.appAction

  const [target, setTarget] = useState('')

  const newMessage = myMessage.trim();         

  async function getSummary(msg) {
    // Create a loading indicator div
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("self-start", "p-2", "px-3", "ml-3", "max-w-[80%]", "mt-3");
  
    const loadingRoot = ReactDOM.createRoot(loadingDiv);
    loadingRoot.render(
    <BeatLoader
      color="#9a9a9a"
      loading
      size={12}
    />);
  
    chatAreaRef.current.appendChild(loadingDiv);
    chatAreaRef.current.scrollTo({ top: chatAreaRef.current.scrollHeight, behavior: "smooth" });
  
    // Fetch the summary
    const response = await summarize(msg);
  
    // Remove the loading animation
    chatAreaRef.current.removeChild(loadingDiv);
  
    // Display the summary
    renderResponse(response, chatAreaRef);
  
    setTimeout(() => {
      chatAreaRef.current.scrollTo({ top: chatAreaRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  
    return response;
  }

  async function getDetectedLanguage(msg) {
    const [detectedLanguage, confidence, langTag] = await detectLanguage(msg)

    const response = `Looks like the language is ${detectedLanguage}! I am ${confidence} sure about it.`
    renderResponse(response, chatAreaRef)
  }

  async function displayOptions(msg) {
    await getDetectedLanguage(msg);
    const existingDropdowns = chatAreaRef.current.querySelectorAll(".translate-options");
    existingDropdowns.forEach((dropdown) => dropdown.remove());
  
    const translateOptionsRoot = ReactDOM.createRoot(document.createElement("div"));
    translateOptionsRoot._internalRoot.containerInfo.classList.add("translate-options")
    chatAreaRef.current.appendChild(translateOptionsRoot._internalRoot.containerInfo);

    setTimeout(() => {
      translateOptionsRoot.render(<TranslateOptions setTarget={setTarget} />);

      setTimeout(() => {
        chatAreaRef.current.scrollTo({ top: chatAreaRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
      
    }, 1500);
  }  

  useEffect(() => {
    if(!newMessage) return

    const languageTagToHumanReadable = (languageTag, targetLanguage) => {
      const displayNames = new Intl.DisplayNames([targetLanguage], {
        type: 'language',
      });
      return displayNames.of(languageTag);
    };  
    let targetLanguage = languageTagToHumanReadable(target, 'english')

    async function test() {
      const [detectedLanguage, confidence, langTag] = await detectLanguage(newMessage)
      
      const translated = await translateMessage(langTag, target, newMessage)
      renderResponse(translated, chatAreaRef, targetLanguage)      
    }
    test()    
  }, [target]);

  useEffect(() => {
    if (send) {
      if (!chatAreaRef.current) return;
      renderMessage(newMessage, chatAreaRef)      
      setSend(false);

      if(appAction === 'detect'){
        getDetectedLanguage(newMessage)
      }else if(appAction === 'translate'){
        displayOptions(newMessage)
      }else if(appAction === 'summarize'){
        getSummary(newMessage)
      }else{
        if (newMessage.length > 150){
          getSummary(newMessage)
        } else {
          displayOptions(newMessage)
        }
      } 
    }
  }, [send]);


  return (
    <div ref={chatAreaRef} className="chat-area flex-1 flex flex-col max-h-full overflow-auto w-full">

      <div className="self-start p-2 px-3 mr-3 rounded-[20px] max-w-[80%] mt-3">
        <TypeAnimation
         sequence={['Hi there! Welcome to iTranslate, what would you like to do today.']} 
         cursor={false}
         repeat={0}
         speed={80}/>
      </div>

      
    </div>
  );
};

export default ChatArea;
