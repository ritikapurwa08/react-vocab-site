
/**
 * Simple script to test the Gemini API key and connection.
 *
 * IMPORTANT: Replace "YOUR_GEMINI_API_KEY" below with the actual key
 * you obtained from Google AI Studio.
 */
// 1. Replace this placeholder with your actual Gemini API Key


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// 2. Define the API endpoint URL and model
const MODEL_NAME = 'gemini-2.5-flash-preview-09-2025';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

// 3. Define the request payload
const payload = {
    contents: [{
        parts: [{
            text: "Write a short, encouraging welcome message for a new vocabulary learner."
        }]
    }]
};

/**
 * Executes the API call and handles the response.
 */
async function testGeminiAPI() {
    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY" || !GEMINI_API_KEY) {
        console.error("ERROR: Please replace 'YOUR_GEMINI_API_KEY' with your actual key in the script.");
        return;
    }

    console.log(`Testing connection to Gemini API using model: ${MODEL_NAME}...`);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Parse the response, even if the status is not strictly 'ok' (to check for API errors)
        const result = await response.json();

        if (response.ok) {
            const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            console.log("--- API Test SUCCESSFUL ---");
            console.log("Status: 200 OK");
            console.log("Generated Text:");
            console.log(generatedText || "No text returned, but response status was OK.");
        } else {
            console.log("--- API Test FAILED (HTTP Error) ---");
            console.error(`Status: ${response.status} ${response.statusText}`);
            console.error("Error Details:", result);
            if (response.status === 400 || response.status === 403) {
                 console.log("\nPossible API Key Issues:");
                 console.log("1. Key is incorrect or revoked.");
                 console.log("2. Project is not enabled for the Gemini API.");
            }
        }
    } catch (error) {
        console.log("--- API Test FAILED (Network/Fetch Error) ---");
        console.error("An unexpected error occurred:", error);
    }
}

// Execute the test function
testGeminiAPI();
