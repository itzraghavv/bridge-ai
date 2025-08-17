import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { sourceSchema, targetSchema } = await request.json();

    if (!sourceSchema || !targetSchema) {
      return NextResponse.json(
        { error: "Both source and target schemas are required" },
        { status: 400 }
      );
    }

    // Create a prompt for the AI to analyze the schemas
    const prompt = `
    Analyze these two API schemas and suggest how to bridge them:

    SOURCE API SCHEMA:
    ${JSON.stringify(sourceSchema, null, 2)}

    TARGET API SCHEMA:
    ${JSON.stringify(targetSchema, null, 2)}

    Please provide:
    1. Field mappings between the two APIs
    2. A workflow plan for how data from the source API can trigger actions in the target API
    3. Any data transformations needed
    4. Potential use cases for this integration

    Format your response as JSON with the following structure:
    {
      "mappings": [
        {
          "source": "field_name",
          "target": "field_name",
          "transformation": "description of transformation needed"
        }
      ],
      "workflow": "description of the workflow",
      "useCases": ["use case 1", "use case 2"],
      "recommendations": ["recommendation 1", "recommendation 2"]
    }
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert API integration specialist. Analyze the provided API schemas and suggest intelligent bridges between them.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.1,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from GroqAI");
    }

    // Try to parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (parseError) {
      // If parsing fails, return the raw response
      parsedResponse = {
        parseError,
        mappings: [],
        workflow: response,
        useCases: [],
        recommendations: [],
      };
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error analyzing schemas:", error);
    return NextResponse.json(
      { error: "Failed to analyze schemas" },
      { status: 500 }
    );
  }
}
