import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        return data.candidates[0].content.parts[0].text;

    } catch(error){
   console.log(error);
   res.status(500).json({
      error:error.message
   })
}
};

export default getOpenAIAPIResponse;