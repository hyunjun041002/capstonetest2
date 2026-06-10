import { machine } from "../config/ai.config.js";
import { config } from "../config/env.config.js";

export const aiPlay = async (question) => {
  try {
    const answer = await machine.generateContent(question);
    return answer.response.text();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
