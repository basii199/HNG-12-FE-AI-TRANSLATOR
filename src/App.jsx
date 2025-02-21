import ChatArea from "./components/ChatArea"
import ErrorHeader from "./components/ErrorHeader"
import Footer from "./components/Footer"
import InputArea from "./components/InputArea"

import { useEffect, useState } from "react"


function App() {
  
  const [myMessage, setMyMessage] = useState('')
  const [appAction, setAppAction] = useState('')
  const [send, setSend] = useState(false)
  const [AIReady, setAIReady] = useState(true)
  
  const chatDetails = {
    mine: [myMessage, setMyMessage],
    appAction: [appAction, setAppAction],
    send: [send, setSend],
    AIReady: [AIReady, setAIReady]
  }

  useEffect(()=>{
    if (!('ai' in self && 'summarizer' in self.ai && 'translator' in self.ai && 'languageDetector' in self.ai)) {
      setAIReady(false)
    }
  }, [])

  return (
    <>
      {!AIReady && <ErrorHeader />}
      <ChatArea chatDetails={chatDetails}/>
      <InputArea chatDetails={chatDetails}/>
      <Footer chatDetails={chatDetails}/>
    </>
  )
}

export default App
