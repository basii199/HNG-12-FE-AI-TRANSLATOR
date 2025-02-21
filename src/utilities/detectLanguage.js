async function detectLanguage(msg) {
  let detector;
  detector = await self.ai.languageDetector.create();

  const results = await detector.detect(msg);

  const result = results[0]
  const langTag = result.detectedLanguage
  const confidence = `${(result.confidence * 100).toFixed(2)}%`

  const languageTagToHumanReadable = (languageTag, targetLanguage) => {
    const displayNames = new Intl.DisplayNames([targetLanguage], {
      type: 'language',
    });
    return displayNames.of(languageTag);
  };

  let detectedLanguage = languageTagToHumanReadable(langTag, 'english')

  return [detectedLanguage, confidence, langTag]
}

export default detectLanguage