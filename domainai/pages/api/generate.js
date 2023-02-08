import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let conversationList = [];
let prependageMessage = "You cluck like a chicken";
export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid message",
      }
    });
    return;
  }
  const prependageMessage = req.body.pMessage || 'Cluck click.';
  if (prependageMessage.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid Primer Message",
      }
    });
    return;
  }
  

  conversationList.push(`User: ${message}`);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(conversationList,prependageMessage),
      temperature: 0.7,
      max_tokens: 2000,
    });
    //push the response from OpenAI with StarburgerAI: in front of it
    conversationList.push(`RenshawTravelAI: ${completion.data.choices[0].text}`);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(conversationList,prependageMessage) {
  // Create a string with all the conversation history joined by newlines
  const conversation = conversationList.join('\n');

  return ` ${prependageMessage}
  Conversation: ${conversation}
  Response: `;
}
