async function summarize (msg){
  const options = {
    sharedContext: 'The user is about to share some content, use general knowledge and context within the users to summarize the users information',
    type: 'tl;dr',
    format: 'plain-text',
    length: 'medium',
  };
  const available = (await self.ai.summarizer.capabilities()).available;

  if (available === 'readily') {
    const summarizer = await self.ai.summarizer.create(options);

    const summary = await summarizer.summarize(msg, {
      context: 'This article is intended for a grading instructor.',
    });
    
    return summary
  } else {
    console.log('AI unavailable')
  }
}

export default summarize