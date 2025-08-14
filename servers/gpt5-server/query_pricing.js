#!/usr/bin/env node
import { callGPT5 } from './build/utils.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../.env');
dotenv.config({ path: envPath });

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set');
    process.exit(1);
  }

  try {
    const result = await callGPT5(
      process.env.OPENAI_API_KEY,
      "How much does GPT-5 cost? Please provide detailed pricing information including cost per token for input and output, any usage tiers, and how it compares to previous models.",
      {
        model: "gpt-5",
        reasoning_effort: "medium"
      }
    );
    
    console.log("GPT-5 Response:");
    console.log("=".repeat(50));
    console.log(result.content);
    
    if (result.usage) {
      console.log("\nUsage Information:");
      console.log(`Prompt tokens: ${result.usage.prompt_tokens}`);
      console.log(`Completion tokens: ${result.usage.completion_tokens}`);
      console.log(`Total tokens: ${result.usage.total_tokens}`);
    }
    
  } catch (error) {
    console.error('Error querying GPT-5:', error.message);
  }
}

main();