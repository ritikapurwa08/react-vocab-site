/**
 * Interactive script to get the Webster meaning of a word using the Gemini API
 * with Google Search grounding.
 *
 * NOTE: This script assumes the GEMINI_API_KEY is correctly set in the environment.
 */
// 1. API Key is expected to be loaded from the environment (e.g., via process.env)
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;

// 2. Define the API endpoint URL and model
const MODEL_NAME = 'gemini-2.5-flash-preview-09-2025';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
const MAX_RETRIES = 5;

/**
 * Executes a robust API call to get the Webster meaning for a given word.
 * @param {string} word The word to look up.
 */
async function getWebsterMeaning(word) {
    const systemPrompt = `You are an expert lexicographer. Provide a concise, clear definition of the word, suitable for a vocabulary learner. Your definition should resemble a formal dictionary entry (e.g., from Webster's dictionary). Only include the definition, not introductory or conversational text.`;
    const userQuery = `What is the Webster dictionary meaning of the word: "${word}"?`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        // IMPORTANT: Use Google Search tool for grounded, up-to-date meaning
        tools: [{ "google_search": {} }]
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    for (let retries = 0; retries < MAX_RETRIES; retries++) {
        try {
            const response = await fetch(API_URL, options);
            const result = await response.json();

            if (response.status === 429 && retries < MAX_RETRIES - 1) {
                const delay = Math.pow(2, retries) * 1000;
                console.log(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue; // Retry the loop
            }

            if (!response.ok) {
                console.error(`API Error - Status: ${response.status} ${response.statusText}`);
                console.error("Error Details:", result);
                return "Error: Could not retrieve meaning.";
            }

            const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            // Extract and display the search sources for grounding
            let sources = [];
            const groundingMetadata = result.candidates?.[0]?.groundingMetadata;
            if (groundingMetadata?.groundingAttributions) {
                sources = groundingMetadata.groundingAttributions
                    .map(attr => attr.web?.uri || 'N/A')
                    .filter(uri => uri !== 'N/A');
            }

            let output = generatedText || "No definition found.";

            if (sources.length > 0) {
                 output += `\n\n--- Sources ---\n${sources.join('\n')}`;
            }

            return output;

        } catch (error) {
            if (retries < MAX_RETRIES - 1) {
                const delay = Math.pow(2, retries) * 1000;
                console.log(`Network error. Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            console.error("An unexpected error occurred:", error);
            return "Fatal Error: Failed to connect or complete the request.";
        }
    }
    return "Error: Maximum retries reached.";
}

/**
 * Main interactive function.
 */
async function main() {
    if (!GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY is not set in the environment.");
        return;
    }

    let word = prompt("Enter a word to get its Webster meaning:");

    // Simple loop for multiple lookups
    while (word && word.trim() !== '') {
        const result = await getWebsterMeaning(word.trim());

        console.log(`\n========================================`);
        console.log(`WORD: ${word.toUpperCase()}`);
        console.log(`========================================`);
        console.log(`DEFINITION:\n${result}`);
        console.log(`========================================\n`);

        word = prompt("Enter another word (or leave blank to exit):");
    }

    console.log("Exiting Webster Meaning Generator.");
}

// Execute the main function
main();
