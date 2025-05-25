// // This is a Vite/Express API endpoint

// import express from "express"
// import cors from "cors"
// import dotenv from "dotenv"

// dotenv.config()

// const router = express.Router()

// // Enable CORS
// router.use(cors())

// // Translation endpoint
// router.post("/translate", async (req, res) => {
//   try {
//     const { text, targetLanguage } = req.body

//     if (!text) {
//       return res.status(400).json({ error: "Text is required" })
//     }

//     if (!targetLanguage) {
//       return res.status(400).json({ error: "Target language is required" })
//     }

//     // Get language name from code
//     const languageNames: Record<string, string> = {
//       en: "English",
//       es: "Spanish",
//       fr: "French",
//       de: "German",
//       ru: "Russian",
//       zh: "Chinese",
//       ja: "Japanese",
//       ar: "Arabic",
//       hi: "Hindi",
//       pt: "Portuguese",
//       it: "Italian",
//     }

//     const languageName = languageNames[targetLanguage] || targetLanguage

//     // Use OpenAI for translation
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: `You are a professional translator specializing in song lyrics. Translate the following lyrics to ${languageName}. Preserve the original formatting, including line breaks and stanzas. Keep each line short and poetic, matching the rhythm of the original song. Only return the translated text without any explanations or additional text.`,
//           },
//           {
//             role: "user",
//             content: text,
//           },
//         ],
//         temperature: 0.3,
//       }),
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       console.error("OpenAI API error:", errorData)
//       return res.status(response.status).json({
//         error: `OpenAI API error: ${response.status} ${response.statusText}`,
//       })
//     }

//     const data = await response.json()
//     const translatedText = data.choices[0].message.content.trim()

//     return res.json({ translatedText })
//   } catch (error) {
//     console.error("Translation error:", error)
//     return res.status(500).json({
//       error: error instanceof Error ? error.message : "Unknown error occurred",
//     })
//   }
// })

// export default router
