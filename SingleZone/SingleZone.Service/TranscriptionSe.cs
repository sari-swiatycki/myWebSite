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
using System.IO;
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
        private bool ContainsEnglish(string text)
        {
            return text.Any(c => (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'));
        }
        public async Task<string> TranscribeAudioFullAsync(string audioFilePath)
        {
            _logger.LogInformation($"Starting transcription for file: {Path.GetFileName(audioFilePath)}");

            if (!File.Exists(audioFilePath))
            {
                _logger.LogError($"File not found: {audioFilePath}");
                throw new FileNotFoundException($"Audio file not found: {audioFilePath}");
            }

            var fileInfo = new FileInfo(audioFilePath);
            if (fileInfo.Length > 25 * 1024 * 1024)
            {
                _logger.LogError($"File size exceeds OpenAI limit: {fileInfo.Length / (1024 * 1024)}MB");
                throw new InvalidOperationException("File size exceeds OpenAI limit of 25MB");
            }

            using var client = new HttpClient();
            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/audio/transcriptions");

            request.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

            using var formData = new MultipartFormDataContent();
            formData.Add(new StringContent("whisper-1"), "model");

            try
            {
                var fileBytes = await File.ReadAllBytesAsync(audioFilePath);
                var fileContent = new ByteArrayContent(fileBytes);

                string contentType = GetContentTypeFromExtension(Path.GetExtension(audioFilePath));
                fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);

                formData.Add(fileContent, "file", Path.GetFileName(audioFilePath));
                request.Content = formData;

                _logger.LogInformation("Sending request to OpenAI API");

                using var response = await client.SendAsync(request);
                var responseContent = await response.Content.ReadAsStringAsync();

                _logger.LogInformation($"Received response with status code: {response.StatusCode}");

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError($"OpenAI API error: {responseContent}");
                    throw new HttpRequestException($"OpenAI API error: {responseContent}");
                }

                var resultJson = JsonDocument.Parse(responseContent);

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

            request.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

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

        public async Task<object> TranslateTextWithLinesAsync(string text, string targetLanguage)
        {
            _logger.LogInformation($"Starting line-by-line translation to {targetLanguage}");

            if (string.IsNullOrEmpty(text))
            {
                _logger.LogWarning("Empty text provided for translation");
                return new { lines = new object[0] };
            }

            var lines = SplitTextIntoLines(text);
            _logger.LogInformation($"Split text into {lines.Count} lines for translation");

            var result = new List<object>();
            using var client = new HttpClient();

            foreach (var line in lines)
            {
                try
                {
                    using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
                    request.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

                    var systemMessage = GetTranslationSystemMessage(targetLanguage);

                    var requestBody = new
                    {
                        model = "gpt-3.5-turbo",
                        messages = new[]
                        {
                            new { role = "system", content = systemMessage },
                            new { role = "user", content = line.Trim() }
                        },
                        temperature = 0.3,
                        max_tokens = 500
                    };

                    var jsonContent = JsonSerializer.Serialize(requestBody);
                    request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                    using var response = await client.SendAsync(request);
                    var responseContent = await response.Content.ReadAsStringAsync();

                    if (!response.IsSuccessStatusCode)
                    {
                        _logger.LogError($"OpenAI API translation error for line: {responseContent}");
                        result.Add(new
                        {
                            original = line.Trim(),
                            translated = $"[תרגום לא זמין: {line.Trim()}]"
                        });
                        continue;
                    }

                    var resultJson = JsonDocument.Parse(responseContent);

                    if (resultJson.RootElement.TryGetProperty("choices", out var choicesElement) &&
                        choicesElement.GetArrayLength() > 0)
                    {
                        var firstChoice = choicesElement[0];
                        if (firstChoice.TryGetProperty("message", out var messageElement) &&
                            messageElement.TryGetProperty("content", out var contentElement))
                        {
                            var translatedLine = contentElement.GetString()?.Trim() ?? line.Trim();
                            result.Add(new
                            {
                                original = line.Trim(),
                                translated = translatedLine
                            });
                        }
                        else
                        {
                            result.Add(new
                            {
                                original = line.Trim(),
                                translated = line.Trim()
                            });
                        }
                    }
                    else
                    {
                        result.Add(new
                        {
                            original = line.Trim(),
                            translated = line.Trim()
                        });
                    }

                    await Task.Delay(100);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error translating line: {line}");
                    result.Add(new
                    {
                        original = line.Trim(),
                        translated = $"[שגיאה בתרגום: {line.Trim()}]"
                    });
                }
            }

            _logger.LogInformation($"Line-by-line translation completed. Processed {result.Count} lines");
            return new { lines = result };
        }

        public async Task<object> TranslateTextWithLinesAndTransliterationAsync(string text, string targetLanguage)
        {
            _logger.LogInformation($"Starting line-by-line translation and transliteration to {targetLanguage}");

            if (string.IsNullOrEmpty(text))
            {
                _logger.LogWarning("Empty text provided for translation");
                return new { lines = new object[0] };
            }

            var lines = SplitTextIntoLines(text);
            _logger.LogInformation($"Split text into {lines.Count} lines for translation and transliteration");

            var result = new List<object>();
            using var client = new HttpClient();

            foreach (var line in lines)
            {
                try
                {
                    // תרגום
                    using var translateRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
                    translateRequest.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

                    var systemMessage = GetTranslationSystemMessage(targetLanguage);

                    var translateRequestBody = new
                    {
                        model = "gpt-3.5-turbo",
                        messages = new[]
                        {
                            new { role = "system", content = systemMessage },
                            new { role = "user", content = line.Trim() }
                        },
                        temperature = 0.3,
                        max_tokens = 500
                    };

                    var translateJsonContent = JsonSerializer.Serialize(translateRequestBody);
                    translateRequest.Content = new StringContent(translateJsonContent, Encoding.UTF8, "application/json");

                    using var translateResponse = await client.SendAsync(translateRequest);
                    var translateResponseContent = await translateResponse.Content.ReadAsStringAsync();

                    string translatedLine = line.Trim();
                    if (translateResponse.IsSuccessStatusCode)
                    {
                        var translateResultJson = JsonDocument.Parse(translateResponseContent);
                        if (translateResultJson.RootElement.TryGetProperty("choices", out var choicesElement) &&
                            choicesElement.GetArrayLength() > 0)
                        {
                            var firstChoice = choicesElement[0];
                            if (firstChoice.TryGetProperty("message", out var messageElement) &&
                                messageElement.TryGetProperty("content", out var contentElement))
                            {
                                translatedLine = contentElement.GetString()?.Trim() ?? line.Trim();
                            }
                        }
                    }

                    // עיתוק (transliteration)
                    string transliteratedLine = "";
                    var sourceLanguage = DetectLanguage(line);
                    if (!string.IsNullOrEmpty(sourceLanguage))
                    {
                        using var translitRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
                        translitRequest.Headers.Add("Authorization", $"Bearer {_openAiApiKey}");

                        var translitSystemMessage = GetTransliterationSystemMessage(sourceLanguage);

                        var translitRequestBody = new
                        {
                            model = "gpt-3.5-turbo",
                            messages = new[]
                            {
                                new { role = "system", content = translitSystemMessage },
                                new { role = "user", content = line.Trim() }
                            },
                            temperature = 0.2,
                            max_tokens = 500
                        };

                        var translitJsonContent = JsonSerializer.Serialize(translitRequestBody);
                        translitRequest.Content = new StringContent(translitJsonContent, Encoding.UTF8, "application/json");

                        using var translitResponse = await client.SendAsync(translitRequest);
                        var translitResponseContent = await translitResponse.Content.ReadAsStringAsync();

                        if (translitResponse.IsSuccessStatusCode)
                        {
                            var translitResultJson = JsonDocument.Parse(translitResponseContent);
                            if (translitResultJson.RootElement.TryGetProperty("choices", out var translitChoicesElement) &&
                                translitChoicesElement.GetArrayLength() > 0)
                            {
                                var translitFirstChoice = translitChoicesElement[0];
                                if (translitFirstChoice.TryGetProperty("message", out var translitMessageElement) &&
                                    translitMessageElement.TryGetProperty("content", out var translitContentElement))
                                {
                                    transliteratedLine = translitContentElement.GetString()?.Trim() ?? "";
                                }
                            }
                        }
                    }

                    result.Add(new
                    {
                        original = line.Trim(),
                        translated = translatedLine,
                        transliterated = transliteratedLine
                    });

                    await Task.Delay(200);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error translating/transliterating line: {line}");
                    result.Add(new
                    {
                        original = line.Trim(),
                        translated = $"[שגיאה בתרגום: {line.Trim()}]",
                        transliterated = ""
                    });
                }
            }

            _logger.LogInformation($"Line-by-line translation and transliteration completed. Processed {result.Count} lines");
            return new { lines = result };
        }

        private List<string> SplitTextIntoLines(string text)
        {
            var lines = new List<string>();

            var splitByNewline = text.Split(new[] { '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries)
                                    .Where(line => !string.IsNullOrWhiteSpace(line))
                                    .ToArray();

            if (splitByNewline.Length > 1)
            {
                lines.AddRange(splitByNewline);
            }
            else
            {
                var sentences = text.Split(new[] { '.', '!', '?', '،', '؟', '؛' }, StringSplitOptions.RemoveEmptyEntries)
                                   .Where(sentence => !string.IsNullOrWhiteSpace(sentence.Trim()))
                                   .Select(sentence => sentence.Trim())
                                   .ToArray();

                if (sentences.Length > 1)
                {
                    lines.AddRange(sentences);
                }
                else
                {
                    var phrases = text.Split(new[] { ',', '،' }, StringSplitOptions.RemoveEmptyEntries)
                                     .Where(phrase => !string.IsNullOrWhiteSpace(phrase.Trim()) && phrase.Trim().Length > 10)
                                     .Select(phrase => phrase.Trim())
                                     .ToArray();

                    if (phrases.Length > 1)
                    {
                        lines.AddRange(phrases);
                    }
                    else
                    {
                        var words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                        var wordsPerLine = Math.Max(6, Math.Min(12, words.Length / 4));

                        for (int i = 0; i < words.Length; i += wordsPerLine)
                        {
                            var lineWords = words.Skip(i).Take(wordsPerLine);
                            var line = string.Join(" ", lineWords).Trim();
                            if (!string.IsNullOrEmpty(line))
                            {
                                lines.Add(line);
                            }
                        }
                    }
                }
            }

            if (lines.Count == 0)
            {
                lines.Add(text.Trim());
            }

            return lines;
        }

        private string DetectLanguage(string text)
        {
            if (ContainsHebrew(text)) return "Hebrew";
            if (ContainsArabic(text)) return "Arabic";
            if (ContainsRussian(text)) return "Russian";
            if (ContainsChinese(text)) return "Chinese";
            if (ContainsJapanese(text)) return "Japanese";
            if (ContainsKorean(text)) return "Korean";
            if (ContainsGreek(text)) return "Greek";
            if (ContainsThai(text)) return "Thai";
            if (ContainsEnglish(text)) return "English";
            return "";
        }

        //private string GetTransliterationSystemMessage(string sourceLanguage)
        //{
        //    return sourceLanguage switch
        //    {
        //        "Hebrew" => "Convert the following Hebrew text to Latin characters (transliteration). Write each Hebrew word using English letters to show how it sounds. For example: 'שלום' becomes 'Shalom', 'אני אוהב אותך' becomes 'Ani ohev otach'. Keep the same structure and spacing.",
        //        "Arabic" => "Convert the following Arabic text to Latin characters (transliteration). Write each Arabic word using English letters to show how it sounds. For example: 'السلام عليكم' becomes 'As-salaam alaikum'. Keep the same structure and spacing.",
        //        "Russian" => "Convert the following Russian text to Latin characters (transliteration). Write each Russian word using English letters to show how it sounds. For example: 'Привет' becomes 'Privet', 'Как дела?' becomes 'Kak dela?'. Keep the same structure and spacing.",
        //        "Chinese" => "Convert the following Chinese text to Pinyin (Latin transliteration). Write each Chinese character using Pinyin with tone marks. Keep the same structure and spacing.",
        //        "Japanese" => "Convert the following Japanese text to Romaji (Latin transliteration). Write each Japanese word using English letters to show how it sounds. Keep the same structure and spacing.",
        //        "Korean" => "Convert the following Korean text to Latin characters (transliteration). Write each Korean word using English letters to show how it sounds. Keep the same structure and spacing.",
        //        "Greek" => "Convert the following Greek text to Latin characters (transliteration). Write each Greek word using English letters to show how it sounds. Keep the same structure and spacing.",
        //        "Thai" => "Convert the following Thai text to Latin characters (transliteration). Write each Thai word using English letters to show how it sounds. Keep the same structure and spacing.",
        //        => "Convert the following text to Latin characters (transliteration). Write each word using English letters to show how it sounds. Keep the same structure and spacing.",
        //        "English" => "Convert the following English text to Hebrew letters showing how it sounds in Hebrew. Write each English word using Hebrew letters to show the pronunciation. For example: 'Hello' becomes 'הלו', 'Thank you' becomes 'ת'אנק יו', 'Computer' becomes 'קומפיוטר'. Keep the same structure and spacing. Write only the Hebrew transliteration without explanations.",
        //        _ => "Convert the following text to Hebrew letters showing how it sounds in Hebrew. Write each word using Hebrew letters to show the pronunciation. Keep the same structure and spacing. Write only the Hebrew transliteration without explanations."
        //    };
        //}







        private string GetTransliterationSystemMessage(string sourceLanguage)
        {
            return sourceLanguage switch
            {
                "Hebrew" => "Convert the following Hebrew text to Latin characters (transliteration). Write each Hebrew word using English letters to show how it sounds. For example: 'שלום' becomes 'Shalom', 'אני אוהב אותך' becomes 'Ani ohev otach'. Keep the same structure and spacing.",
                "Arabic" => "Convert the following Arabic text to Latin characters (transliteration). Write each Arabic word using English letters to show how it sounds. For example: 'السلام عليكم' becomes 'As-salaam alaikum'. Keep the same structure and spacing.",
                "Russian" => "Convert the following Russian text to Latin characters (transliteration). Write each Russian word using English letters to show how it sounds. For example: 'Привет' becomes 'Privet', 'Как дела?' becomes 'Kak dela?'. Keep the same structure and spacing.",
                "Chinese" => "Convert the following Chinese text to Pinyin (Latin transliteration). Write each Chinese character using Pinyin with tone marks. Keep the same structure and spacing.",
                "Japanese" => "Convert the following Japanese text to Romaji (Latin transliteration). Write each Japanese word using English letters to show how it sounds. Keep the same structure and spacing.",
                "Korean" => "Convert the following Korean text to Latin characters (transliteration). Write each Korean word using English letters to show how it sounds. Keep the same structure and spacing.",
                "Greek" => "Convert the following Greek text to Latin characters (transliteration). Write each Greek word using English letters to show how it sounds. Keep the same structure and spacing.",
                "Thai" => "Convert the following Thai text to Latin characters (transliteration). Write each Thai word using English letters to show how it sounds. Keep the same structure and spacing.",
                "English" => "Convert the following English text to Hebrew letters showing how it sounds in Hebrew. Write each English word using Hebrew letters to show the pronunciation. For example: 'Hello' becomes 'הלו', 'Thank you' becomes 'ת'אנק יו', 'Computer' becomes 'קומפיוטר'. Keep the same structure and spacing. Write only the Hebrew transliteration without explanations.",
                _ => "Convert the following text to Hebrew letters showing how it sounds in Hebrew. Write each word using Hebrew letters to show the pronunciation. Keep the same structure and spacing. Write only the Hebrew transliteration without explanations."
            };
        }

        private bool ContainsHebrew(string text)
        {
            return text.Any(c => c >= 0x0590 && c <= 0x05FF);
        }

        private bool ContainsArabic(string text)
        {
            return text.Any(c => c >= 0x0600 && c <= 0x06FF);
        }

        private bool ContainsRussian(string text)
        {
            return text.Any(c => c >= 0x0400 && c <= 0x04FF);
        }

        private bool ContainsChinese(string text)
        {
            return text.Any(c => (c >= 0x4E00 && c <= 0x9FFF) || (c >= 0x3400 && c <= 0x4DBF));
        }

        private bool ContainsJapanese(string text)
        {
            return text.Any(c => (c >= 0x3040 && c <= 0x309F) || (c >= 0x30A0 && c <= 0x30FF));
        }

        private bool ContainsKorean(string text)
        {
            return text.Any(c => c >= 0xAC00 && c <= 0xD7AF);
        }

        private bool ContainsGreek(string text)
        {
            return text.Any(c => c >= 0x0370 && c <= 0x03FF);
        }

        private bool ContainsThai(string text)
        {
            return text.Any(c => c >= 0x0E00 && c <= 0x0E7F);
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
                _ => "audio/mpeg"
            };
        }
    }
}