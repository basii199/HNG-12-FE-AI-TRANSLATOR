import ChatArea from "./components/ChatArea"
import Footer from "./components/Footer"
import InputArea from "./components/InputArea"

import { useState } from "react"


function App() {
  
  const [myMessage, setMyMessage] = useState('')
  const [appAction, setAppAction] = useState('')
  const [send, setSend] = useState(false)
  
  const chatDetails = {
    mine: [myMessage, setMyMessage],
    appAction: [appAction, setAppAction],
    send: [send, setSend]
  }

  return (
    <>
      <ChatArea chatDetails={chatDetails}/>
      <InputArea chatDetails={chatDetails}/>
      <Footer chatDetails={chatDetails}/>
    </>
  )
}

export default App
