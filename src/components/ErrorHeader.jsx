const ErrorHeader = () => {
  return (
    <div className="w-full h-10 bg-red-700 flex items-center justify-center gap-2 text-[clamp(8px,_2.5vw,_16px)]">
      One or more of the AI features is not supported on this browser. 
      <a className="text-blue-400" href="https://developer.chrome.com/docs/ai/summarizer-api">Learn more</a>
    </div>
  )
}

export default ErrorHeader
