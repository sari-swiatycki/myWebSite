//using Microsoft.Extensions.Logging;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.Json;
//using System.Threading.Tasks;

//namespace SingleZone.Service
//{
//  public  class TranscriptionSe
//    {

//        private readonly ILogger<TranscriptionSe> _logger;
//        private readonly string _openAiApiKey;

//        public TranscriptionSe(ILogger<TranscriptionSe> logger, string openAiApiKey = null)
//        {
//            _logger = logger; 
//            _openAiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
//         ?? throw new InvalidOperationException("OPENAI_API_KEY is not set in environment variables.");
//        }

//        public async Task<string> TranscribeAudioFullAsync(string audioFilePath)
//        {
//            _logger.LogInformation($"Starting transcription for file: {Path.GetFileName(audioFilePath)}");

//            if (!File.Exists(audioFilePath))
//            {
//                _logger.LogError($"File not found: {audioFilePath}");
//                throw new FileNotFoundException($"Audio file not found: {audioFilePath}");
//            }

//            // בדיקת גודל הקובץ - ודא שהוא לא חורג מהמגבלה של OpenAI (כ-25MB)
//            var fileInfo = new FileInfo(audioFilePath);
//            if (fileInfo.Length > 25 * 1024 * 1024)
//            {
//                _logger.LogError($"File size exceeds OpenAI limit: {fileInfo.Length / (1024 * 1024)}MB");
//                throw new InvalidOperationException("File size exceeds OpenAI limit of 25MB");
//            }

//            using var client = new HttpClient();
//            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/audio/transcriptions");

//            // הוסף את מפתח ה-API להרשאות
//            request.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

//            using var formData = new MultipartFormDataContent();

//            // הוספת מודל Whisper כפרמטר חובה
//            formData.Add(new StringContent("whisper-1"), "model");

//            // הוספת הקובץ
//            try
//            {
//                await using var fileStream = File.OpenRead(audioFilePath);

//                var fileContent = new StreamContent(fileStream);
//                string contentType = GetContentTypeFromExtension(Path.GetExtension(audioFilePath));
//                fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);

//                // הוספת הקובץ לטופס עם שם שדה "file" כנדרש ב-API
//                formData.Add(fileContent, "file", Path.GetFileName(audioFilePath));

//                // הגדרת הבקשה
//                request.Content = formData;

//                _logger.LogInformation("Sending request to OpenAI API");

//                try
//                {
//                    // שליחת הבקשה לשרת
//                    using var response = await client.SendAsync(request);

//                    // קריאת התגובה כטקסט לצורך דיבוג
//                    var responseContent = await response.Content.ReadAsStringAsync();
//                    _logger.LogInformation($"Received response with status code: {response.StatusCode}");
//                    _logger.LogInformation($"Response content: {responseContent}");

//                    if (!response.IsSuccessStatusCode)
//                    {
//                        _logger.LogError($"OpenAI API error: {responseContent}");
//                        throw new HttpRequestException($"OpenAI API error: {responseContent}");
//                    }

//                    // עיבוד התגובה
//                    var resultJson = JsonDocument.Parse(responseContent);

//                    // בדיקה אם קיים שדה "text" בתגובה
//                    if (resultJson.RootElement.TryGetProperty("text", out var textElement))
//                    {
//                        var fullText = textElement.GetString();
//                        _logger.LogInformation("Transcription completed successfully");
//                        return fullText ?? string.Empty;
//                    }
//                    else
//                    {
//                        _logger.LogError("Missing 'text' field in OpenAI response");
//                        throw new InvalidOperationException("Missing 'text' field in OpenAI response");
//                    }
//                }
//                catch (HttpRequestException ex)
//                {
//                    _logger.LogError(ex, "HTTP request error when calling OpenAI API");
//                    throw;
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, "Error in transcription service");
//                throw;
//            }
//        }

//        private string GetContentTypeFromExtension(string extension)
//        {
//            return extension.ToLower() switch
//            {
//                ".mp3" => "audio/mpeg",
//                ".wav" => "audio/wav",
//                ".m4a" => "audio/mp4",
//                ".ogg" => "audio/ogg",
//                ".flac" => "audio/flac",
//                _ => "audio/mpeg" // ברירת מחדל
//            };
//        }
//    }
//}
































using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SingleZone.Service
{
    public class TranscriptionService
    {
        private readonly ILogger<TranscriptionService> _logger;
        private readonly string _openAiApiKey;

        public TranscriptionService(ILogger<TranscriptionService> logger, string openAiApiKey = null)
        {
            _logger = logger;
            _openAiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
         ?? throw new InvalidOperationException("OPENAI_API_KEY is not set in environment variables.");
        }

        public async Task<string> TranscribeAudioFullAsync(string audioFilePath)
        {
            _logger.LogInformation($"Starting transcription for file: {Path.GetFileName(audioFilePath)}");

            if (!File.Exists(audioFilePath))
            {
                _logger.LogError($"File not found: {audioFilePath}");
                throw new FileNotFoundException($"Audio file not found: {audioFilePath}");
            }

            // בדיקת גודל הקובץ - ודא שהוא לא חורג מהמגבלה של OpenAI (כ-25MB)
            var fileInfo = new FileInfo(audioFilePath);
            if (fileInfo.Length > 25 * 1024 * 1024)
            {
                _logger.LogError($"File size exceeds OpenAI limit: {fileInfo.Length / (1024 * 1024)}MB");
                throw new InvalidOperationException("File size exceeds OpenAI limit of 25MB");
            }

            using var client = new HttpClient();
            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/audio/transcriptions");

            // הוסף את מפתח ה-API להרשאות
            request.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

            using var formData = new MultipartFormDataContent();

            // הוספת מודל Whisper כפרמטר חובה
            formData.Add(new StringContent("whisper-1"), "model");

            // הוספת הקובץ
            try
            {
                await using var fileStream = File.OpenRead(audioFilePath);

                var fileContent = new StreamContent(fileStream);
                string contentType = GetContentTypeFromExtension(Path.GetExtension(audioFilePath));
                fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);

                // הוספת הקובץ לטופס עם שם שדה "file" כנדרש ב-API
                formData.Add(fileContent, "file", Path.GetFileName(audioFilePath));

                // הגדרת הבקשה
                request.Content = formData;

                _logger.LogInformation("Sending request to OpenAI API");

                try
                {
                    // שליחת הבקשה לשרת
                    using var response = await client.SendAsync(request);

                    // קריאת התגובה כטקסט לצורך דיבוג
                    var responseContent = await response.Content.ReadAsStringAsync();
                    _logger.LogInformation($"Received response with status code: {response.StatusCode}");
                    _logger.LogInformation($"Response content: {responseContent}");

                    if (!response.IsSuccessStatusCode)
                    {
                        _logger.LogError($"OpenAI API error: {responseContent}");
                        throw new HttpRequestException($"OpenAI API error: {responseContent}");
                    }

                    // עיבוד התגובה
                    var resultJson = JsonDocument.Parse(responseContent);

                    // בדיקה אם קיים שדה "text" בתגובה
                    if (resultJson.RootElement.TryGetProperty("text", out var textElement))
                    {
                        var fullText = textElement.GetString();
                        _logger.LogInformation("Transcription completed successfully");
                        return fullText ?? string.Empty;
                    }
                    else
                    {
                        _logger.LogError("Missing 'text' field in OpenAI response");
                        throw new InvalidOperationException("Missing 'text' field in OpenAI response");
                    }
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, "HTTP request error when calling OpenAI API");
                    throw;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in transcription service");
                throw;
            }
        }

        public async Task<string> TranslateTextAsync(string text, string targetLanguage)
        {
            _logger.LogInformation($"Starting translation to {targetLanguage}");

            if (string.IsNullOrEmpty(text))
            {
                _logger.LogWarning("Empty text provided for translation");
                return string.Empty;
            }

            using var client = new HttpClient();
            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");

            // הוסף את מפתח ה-API להרשאות
            request.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

            // יצירת הודעת המערכת לתרגום
            var systemMessage = GetTranslationSystemMessage(targetLanguage);

            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "system", content = systemMessage },
                    new { role = "user", content = text }
                },
                temperature = 0.3,
                max_tokens = 2000
            };

            var jsonContent = JsonSerializer.Serialize(requestBody);
            request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            _logger.LogInformation("Sending translation request to OpenAI API");

            try
            {
                using var response = await client.SendAsync(request);
                var responseContent = await response.Content.ReadAsStringAsync();

                _logger.LogInformation($"Received translation response with status code: {response.StatusCode}");

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError($"OpenAI API translation error: {responseContent}");
                    throw new HttpRequestException($"OpenAI API translation error: {responseContent}");
                }

                var resultJson = JsonDocument.Parse(responseContent);

                if (resultJson.RootElement.TryGetProperty("choices", out var choicesElement) &&
                    choicesElement.GetArrayLength() > 0)
                {
                    var firstChoice = choicesElement[0];
                    if (firstChoice.TryGetProperty("message", out var messageElement) &&
                        messageElement.TryGetProperty("content", out var contentElement))
                    {
                        var translatedText = contentElement.GetString();
                        _logger.LogInformation("Translation completed successfully");
                        return translatedText ?? string.Empty;
                    }
                }

                _logger.LogError("Invalid response format from OpenAI translation API");
                throw new InvalidOperationException("Invalid response format from OpenAI translation API");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "HTTP request error when calling OpenAI translation API");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in translation service");
                throw;
            }
        }

        private string GetTranslationSystemMessage(string targetLanguage)
        {
            var languageInstructions = targetLanguage.ToLower() switch
            {
                "hebrew" or "עברית" => "תרגם את הטקסט הבא לעברית. שמור על המשמעות המקורית והסגנון. אם זה שיר, שמור על הקצב והחרוזים במידת האפשר.",
                "english" or "אנגלית" => "Translate the following text to English. Maintain the original meaning and style. If it's a song, try to preserve rhythm and rhymes when possible.",
                "spanish" or "ספרדית" => "Traduce el siguiente texto al español. Mantén el significado original y el estilo. Si es una canción, trata de preservar el ritmo y las rimas cuando sea posible.",
                "french" or "צרפתית" => "Traduisez le texte suivant en français. Conservez le sens original et le style. S'il s'agit d'une chanson, essayez de préserver le rythme et les rimes lorsque c'est possible.",
                "german" or "גרמנית" => "Übersetzen Sie den folgenden Text ins Deutsche. Behalten Sie die ursprüngliche Bedeutung und den Stil bei. Wenn es ein Lied ist, versuchen Sie, Rhythmus und Reime zu bewahren, wenn möglich.",
                "arabic" or "ערבית" => "ترجم النص التالي إلى العربية. حافظ على المعنى الأصلي والأسلوب. إذا كانت أغنية، حاول الحفاظ على الإيقاع والقوافي عندما يكون ذلك ممكناً.",
                "russian" or "רוסית" => "Переведите следующий текст на русский язык. Сохраните первоначальный смысл и стиль. Если это песня, постарайтесь сохранить ритм и рифмы, когда это возможно.",
                "italian" or "איטלקית" => "Traduci il seguente testo in italiano. Mantieni il significato originale e lo stile. Se è una canzone, cerca di preservare ritmo e rime quando possibile.",
                _ => $"Translate the following text to {targetLanguage}. Maintain the original meaning and style. If it's a song, try to preserve rhythm and rhymes when possible."
            };

            return languageInstructions;
        }

        private string GetContentTypeFromExtension(string extension)
        {
            return extension.ToLower() switch
            {
                ".mp3" => "audio/mpeg",
                ".wav" => "audio/wav",
                ".m4a" => "audio/mp4",
                ".ogg" => "audio/ogg",
                ".flac" => "audio/flac",
                _ => "audio/mpeg" // ברירת מחדל
            };
        }
    }
}
