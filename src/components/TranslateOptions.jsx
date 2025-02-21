import { TypeAnimation } from "react-type-animation"

const TranslateOptions = ( {setTarget}) => {

  function handleChange(e){
    setTarget(e.target.value)
  }

  return (
    <div className="pl-6 p-3 flex items-center gap-2">

      <TypeAnimation
         sequence={['Please select a language to Translate to:']} 
         cursor={false}
         repeat={0}
         speed={80}/>

      <select name="number-of-tickets" id="number-of-tickets" className="border border-white/30 p-1 rounded-[8px] focus:outline-none " onChange={e=>handleChange(e)}>
        <option hidden className="bg-black/50" value=""></option>
        <option className="bg-black/50" value="en">English</option>
        <option className="bg-black/50" value="fr">French</option>
        <option className="bg-black/50" value="pt">Portuguese</option>
        <option className="bg-black/50" value="ru">Russian</option>
        <option className="bg-black/50" value="es">Spanish</option>
        <option className="bg-black/50" value="tr">Turkish</option>
      </select>
    </div>
  )
}

export default TranslateOptions
