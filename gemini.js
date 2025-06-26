const apiurl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBgU_bABTBFXrJ54Ct13lwdRFPGS0NfCaY";

export async function generateresponse(prevuser) {
    if (!prevuser || !prevuser.prompt) {
        return "Invalid input.";
    }

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: prevuser.prompt },
                    ...(prevuser.data ? [{
                        inline_data: {
                            mime_type: prevuser.mime_type,
                            data: prevuser.data
                        }
                    }] : [])
                ]
            }
        ]
    };

    const requestoption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(apiurl, requestoption);
        const data = await response.json();

        // Log the full response for debugging
        console.log("Gemini API response:", data);

        const apiresponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (apiresponse) {
            return apiresponse.replace(/<[^>]*>/g, '').trim();
        } else {
            return data?.error?.message || "No response from Gemini API.";
        }
    } catch (err) {
        console.error("Gemini API error:", err);
        return "Error fetching response from Gemini API.";
    }
}
