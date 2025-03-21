import { NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Define the state schema
const ContactState = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  intent: z.string().optional(),
  response: z.string().optional(),
});

type ContactState = z.infer<typeof ContactState>;

// Initialize the LLM
const model = new ChatOpenAI({
  modelName: "o3-mini-2025-01-31"
});

// Step 1: Analyze intent
async function analyzeIntent(message: string): Promise<string> {
  const prompt = `Analyze the following message and determine its intent. 
  Is it a job offer, collaboration request, question, or something else?
  Message: ${message}
  Respond with just one word: job, collaboration, question, or other.`;

  const response = await model.invoke(prompt);
  return response.content.toString();
}

// Step 2: Generate confirmation email
async function generateConfirmationEmail(state: ContactState): Promise<{ subject: string; html: string }> {
  const prompt = `You are assisting a just graduated from Computer Science student in crafting a confirmation email to someone who contacted them through their personal website. Your task is to create a warm, professional confirmation email that acknowledges their message and sets the right tone for future communication.

PERSONAL INFORMATION:
- Name: Luis Guillen
- Email: luigi@guiar.com.mx
- Phone: +1 (817) 6594871
- LinkedIn: www.linkedin.com/in/luis-guillen-arc
- GitHub: https://github.com/Lu1gi21

INSTRUCTIONS:
1. Create a confirmation email that acknowledges receipt of their message
2. Include the AI-generated response to their inquiry
3. Maintain a friendly yet professional tone
4. Keep it concise but warm
5. Include appropriate greetings and sign-offs
6. Make it feel personal and not automated
7. If it's a job opportunity, express enthusiasm while maintaining professionalism
8. If it's a collaboration request, show interest in learning more
9. If it's a question, acknowledge their interest in your work
10. Generate a subject line that is relevant to their inquiry

From: ${state.name}
Email: ${state.email}
Message: ${state.message}
Intent: ${state.intent}

Generate a complete HTML email that includes all necessary HTML tags and styling. Format your response as JSON with two fields:
{
  "subject": "Your subject line here",
  "html": "Your HTML email content here"
}`;

  const response = await model.invoke(prompt);
  try {
    return JSON.parse(response.content.toString());
  } catch (error) {
    console.error('Error parsing email content:', error);
    return {
      subject: 'Thank you for reaching out!',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${state.name},</p>
        <p>I've received your message and here's my response:</p>
        <p>${state.response}</p>
        <p>Best regards,<br>Luis Guillen</p>
      `
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = ContactState.parse({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    // Step 1: Analyze intent
    const intent = await analyzeIntent(validatedData.message);
    validatedData.intent = intent;

    // Step 2: Generate confirmation email
    const confirmationEmail = await generateConfirmationEmail(validatedData);

    // Step 3: Send notification email to you
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.YOUR_EMAIL || 'your-email@example.com',
      subject: `New Contact Form Submission - ${intent}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Intent:</strong> ${intent}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
    });

    // Step 4: Send confirmation email to the sender
    await resend.emails.send({
      from: 'Luis Guillen <LuisAGuillen@itfocus.tech>',
      to: validatedData.email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    return NextResponse.json({
      success: true,
      intent: intent
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process contact form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 