import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {                  //serverless function
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({ //stream response from LLM
        model: openai('gpt-4o'),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}  