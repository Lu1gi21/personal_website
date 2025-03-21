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

// Initialize the LLM with a timeout
const model = new ChatOpenAI({
  modelName: "o3-mini-2025-01-31",
  timeout: 10000, // 10 second timeout
  maxRetries: 2
});

// Step 1: Analyze intent with timeout
async function analyzeIntent(message: string): Promise<string> {
  try {
    const prompt = `Analyze the following message and determine its intent. 
    Is it a job offer, collaboration request, question, or something else?
    Message: ${message}
    Respond with just one word: job, collaboration, question, or other.`;

    const response = await model.invoke(prompt);
    return response.content.toString();
  } catch (error) {
    console.error('Error analyzing intent:', error);
    return 'other'; // Default fallback
  }
}

// Step 2: Generate confirmation email with timeout
async function generateConfirmationEmail(state: ContactState): Promise<{ subject: string; html: string }> {
  try {
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
    return JSON.parse(response.content.toString());
  } catch (error) {
    console.error('Error generating email:', error);
    return {
      subject: 'Thank you for reaching out!',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${state.name},</p>
        <p>I've received your message and will get back to you soon.</p>
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

    // Step 1: Analyze intent with timeout
    const intent = await analyzeIntent(validatedData.message);
    validatedData.intent = intent;

    // Step 2: Generate confirmation email with timeout
    const confirmationEmail = await generateConfirmationEmail(validatedData);

    // Step 3: Send notification email to you with timeout
    await Promise.race([
      resend.emails.send({
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
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 5000)
      )
    ]);

    // Step 4: Send confirmation email to the sender with timeout
    await Promise.race([
      resend.emails.send({
        from: 'Luis Guillen <LuisAGuillen@itfocus.tech>',
        to: validatedData.email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 5000)
      )
    ]);

    return NextResponse.json({
      success: true,
      intent: intent
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Return appropriate error response based on the error type
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Request timed out. Please try again.',
            details: error.message
          },
          { status: 504 }
        );
      }
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to process contact form',
          details: error.message
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred',
        details: 'Unknown error'
      },
      { status: 500 }
    );
  }
} 