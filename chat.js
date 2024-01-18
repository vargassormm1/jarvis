import "dotenv/config";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import OpenAI from "openai";

const rl = readline.createInterface({ input, output });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const chatHistory = [
  { role: "system", content: "You are a helpful assistant." },
];

const chat = async () => {
  console.log(
    "\n-----------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "Hello! I'm Jarvis, your personal AI chatbot. Feel free to ask me anything. If you wish to exit, just type 'exit'. Let's chat!"
  );
  console.log(
    "-----------------------------------------------------------------------------------------------------------------------------\n"
  );

  const startChat = async () => {
    const userQuestion = await rl.question("You: ");
    if (userQuestion.toLowerCase() === "exit") {
      rl.close();
      return;
    }
    const formattedQuestion = { role: "user", content: userQuestion };
    chatHistory.push(formattedQuestion);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    });
    chatHistory.push(completion.choices[0].message);
    console.log(`\nJarvis: ${completion.choices[0].message.content}\n`);
    startChat();
  };
  startChat();
};

chat();
