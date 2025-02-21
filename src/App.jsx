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
    async function testAI() {
      const translator = await self.ai.translator.capabilities();
      const summarizer = await ai.summarizer.capabilities()
      const detector = await self.ai.languageDetector.capabilities()

      if (translator.available !== 'readily' || summarizer.available !== 'readily' || detector.available !== 'readily'){
        console.log('ai unavailable')
        setAIReady(false)
      }
    }
    testAI()
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
