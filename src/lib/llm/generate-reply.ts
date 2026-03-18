import { Ollama } from 'ollama'

const ollama = new Ollama({ host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434' })

export interface GenerateReplyParams {
  brandName: string
  tone: string
  toneCustom?: string | null
  resolutionOffers?: string | null
  negativeReviewEmail?: string | null
  exampleReplies?: Array<{ review: string; reply: string }> | null
  reviewerName: string
  starRating: number
  reviewText: string
  locationName: string
  model?: string
}

export async function generateReply(params: GenerateReplyParams): Promise<string> {
  const {
    brandName, tone, toneCustom, resolutionOffers, negativeReviewEmail, 
    exampleReplies, reviewerName, starRating, reviewText, locationName,
    model = 'llama3.1'
  } = params

  const customToneStr = toneCustom ? ` - ${toneCustom}` : ''
  const resolutionStr = resolutionOffers ? `\n- Negative reviews (1-3 stars): Be empathetic. Acknowledge the exact issue mentioned. Offer resolution: "${resolutionOffers}". Invite them to email ${negativeReviewEmail || 'us'} to discuss further.` : '\n- Negative reviews (1-3 stars): Be empathetic. Acknowledge the exact issue mentioned. Invite them to contact support.'
  
  let examplesStr = ''
  if (exampleReplies && exampleReplies.length > 0) {
    examplesStr = '\n\nExamples of good replies:\n' + exampleReplies.map((ex) => `Review: ${ex.review}\nReply: ${ex.reply}`).join('\n\n')
  }

  const systemPrompt = `You are the official voice of ${brandName}.

Tone: ${tone}${customToneStr}

Rules:
- Always reference the specific thing the customer mentioned in their review.
- Positive reviews (4-5 stars): Be genuinely grateful. Include a subtle call-to-action to visit again.${resolutionStr}
- Never make promises the business can't keep.
- Never be defensive or argumentative.
- Keep replies to 2-3 sentences maximum. Natural and human — never robotic.
- Do NOT start every reply with "Thank you" — vary your openings.
- Use the reviewer's first name if available, e.g. "Hi ${reviewerName || 'there'},".${examplesStr}
`

  const userMessage = `Review from ${reviewerName || 'Anonymous'} — ${starRating} stars:
"${reviewText || '(No text provided)'}"

Location: ${locationName}

Please generate ONLY the reply text, no introduction or quotes. `

  try {
    const response = await ollama.chat({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      options: {
        temperature: 0.7,
        num_predict: 200, // equivalent to max_tokens
      }
    })

    return response.message.content.trim().replace(/^["']|["']$/g, '') // remove surrounding quotes if any
  } catch (error) {
    console.error("LLM Generation Error:", error)
    throw new Error("Failed to generate reply.")
  }
}
