async function translateMessage (source, target, msg){
  const translator = await self.ai.translator.create({
    sourceLanguage: source,
    targetLanguage: target,
  });

  const translated = await translator.translate(msg);
  return translated
}

export default translateMessage