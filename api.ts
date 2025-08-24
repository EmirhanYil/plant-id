// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

// Default plant identification prompt
const DEFAULT_PLANT_PROMPT = `What is this plant, if it is a houseplant include it's name, care needs (including light, water and whether or not it likes to be rootbound) also provide an estimate of how much this plant costs to purchase 

(look at reddit for prices, just congregate what people generally say they pay for it anecdotally and what they say about care needs is also important (people generally err on letting plants dry out entirely).) 

If it is not a houseplant, provide the plants name, where it grows, whether or not its invasive and some fun facts about it.

For houseplants the format is 

"
Plant Name: [name], 

Image: [image], 

Care Needs: [care needs], 

Cost: [cost]
"

For other plants the format is 
"
Plant Name: [name],
Image: [image],
Where it grows: [where it grows],
Is it invasive: [is it invasive],
Fun Facts: [fun facts]
"
`;

// Function to send image + default prompt to GPT Vision
export async function identifyPlant(imageUrl: string): Promise<string> {
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageUrl
                                }
                            },
                            {
                                type: "text",
                                text: DEFAULT_PLANT_PROMPT
                            }
                        ]
                    }
                ]
            })
        })

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
    } catch (error) {
        console.error('Error in identifyPlant:', error)
        throw error
    }
}