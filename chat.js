import "dotenv/config";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import OpenAI from "openai";

const rl = readline.createInterface({ input, output });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
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

  const userQuestion = await rl.question("You: ");
  if (userQuestion.toLowerCase() === "exit") {
    rl.close();
    return;
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userQuestion },
    ],
  });

  console.log(completion.choices[0]);
};

chat();
