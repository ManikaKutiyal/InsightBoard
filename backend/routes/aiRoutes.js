import "dotenv/config";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CLEAN + COMPATIBLE SYSTEM PROMPT
const SYSTEM_PROMPT = `
You are an AI assistant specializing in Kanban, task refinement, sprint planning, and productivity.

You ALWAYS output EXACTLY TWO SECTIONS:

HUMAN_TEXT:
<helpful explanation>

JSON:
{
  "newTasks": [...],
  "updates": [...]
}

Never output text after the JSON.
Never wrap JSON in quotes.
Never add comments.
Never add extra sections.

ALLOWED UPDATES:
You may modify: title, priority, description, dueDate, storyPoints, tags, dependencies.
You may NOT modify: status, _id, user.

NEW TASK FORMAT:
{
  "title": "string",
  "priority": "low | medium | high",
  "status": "todo",
  "description": "string",
  "dueDate": "YYYY-MM-DD",
  "storyPoints": number,
  "tags": ["string"],
  "dependencies": ["taskId"]
}

BLOCKER RULES:
A task is a BLOCKER if:
- The user says they are stuck
- Requirements are unclear
- Dependencies are unfinished
- High priority with no progress
- Stagnant longer than sprint duration

SPRINT MODEL:
- Use frontend values (sprintLength, sprintOutputs) if provided.
- Otherwise infer from natural language.
- Default sprintLength = 14 days.

SAFE MODE:
Never rewrite whole board. Never change status/_id/user.

END SYSTEM RULES.
`;

router.post("/", async (req, res) => {
  try {
    const { prompt, tasks, sprintLength, sprintOutputs } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Combine system prompt + user request into a SINGLE valid Gemini message
    const finalPrompt = `
${SYSTEM_PROMPT}

========================
USER REQUEST
========================
${prompt}

========================
TASKS
========================
${JSON.stringify(tasks, null, 2)}

========================
SPRINT CONFIG
========================
${JSON.stringify({ sprintLength, sprintOutputs }, null, 2)}
`;

    const response = await model.generateContent(finalPrompt);
    const text = await response.response.text();

    res.json({ text });
  } catch (error) {
    console.error("🚨 AI ROUTE ERROR:", error);
    res.status(500).json({
      error: "AI Route Failed",
      details: error.message,
    });
  }
});

export default router;
