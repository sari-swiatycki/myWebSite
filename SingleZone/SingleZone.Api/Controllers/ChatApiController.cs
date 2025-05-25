using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SingleZone.Api.Controllers.YourMusicWebsite.Models;
using SingleZone.Service;

//namespace SingleZone.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ChatApiController : ControllerBase
//    {
//        //private readonly OpenAIService _openAIService;
//        private readonly HttpClient client = new HttpClient();
//        private readonly string myApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");



//        //[HttpPost("chat")]
//        //public async Task<IActionResult> Chat([FromBody] ChatRequest request)
//        //{
//        //    if (string.IsNullOrEmpty(request.Message))
//        //    {
//        //        return BadRequest("Message cannot be empty");
//        //    }

//        //    string response = await _openAIService.CreateChatCompletion(
//        //        request.Message,
//        //        request.SystemRole ?? "You are a helpful assistant for a music website."
//        //    );

//        //    return Ok(new ChatResponse { Message = response });
//        //}

//        //[HttpPost("music-recommendation")]
//        //public async Task<IActionResult> GetMusicRecommendation([FromBody] MusicRecommendationRequest request)
//        //{
//        //    if (string.IsNullOrEmpty(request.Preferences))
//        //    {
//        //        return BadRequest("Preferences cannot be empty");
//        //    }

//        //    string systemPrompt = "You are a music recommendation expert. Suggest songs and artists based on the user's preferences.";
//        //    string response = await _openAIService.CreateChatCompletion(request.Preferences, systemPrompt);

//        //    return Ok(new ChatResponse { Message = response });
//        //}




//        //        //עובד
//        //        [HttpGet]
//        //        public async Task<IActionResult> Get()
//        //        {
//        //            try
//        //            {
//        //                var prompt = new
//        //                {
//        //                    model = "gpt-4o-mini",
//        //                    messages = new[] {
//        //                new { role = "system", content = "וגם לציורים  אתה מומחה לזמרים ולאתר מוזיקה" },
//        //                new { role = "user", content = "תביא לי דף צביעה של בית" }
//        //            }
//        //                };

//        //                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//        //                {
//        //                    Content = JsonContent.Create(prompt)
//        //                };
//        //                request.Headers.Add("Authorization", $"Bearer {myApiKey}");

//        //                // שליחת הבקשה ל-API
//        //                var response = await client.SendAsync(request);

//        //                if (!response.IsSuccessStatusCode)
//        //                {
//        //                    var responseContent = await response.Content.ReadAsStringAsync();
//        //                    throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
//        //                }

//        //                var responseContent1 = await response.Content.ReadAsStringAsync();
//        //                return Ok(responseContent1); // החזרת התוכן כהצלחה
//        //            }
//        //            catch (HttpRequestException httpEx)
//        //            {
//        //                Console.WriteLine($"שגיאה בחיבור ל-API: {httpEx.Message}");
//        //                return StatusCode(500, "בעיה בחיבור ל-API.");
//        //            }
//        //            catch (System.Text.Json.JsonException jsonEx)
//        //            {
//        //                Console.WriteLine($"שגיאה בקריאת התשובה מ-API: {jsonEx.Message}");
//        //                return StatusCode(500, "שגיאה בקריאת התשובה מ-API.");
//        //            }
//        //            catch (Exception ex)
//        //            {
//        //                Console.WriteLine($"שגיאה כללית: {ex.Message}");
//        //                return StatusCode(500, "שגיאה כלשהי במהלך הפעולה.");
//        //            }
//        //        }
//        //    }
//        //}





//        [HttpPost("chat")]
//        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
//        {
//            try
//            {
//                var prompt = new
//                {
//                    model = "gpt-4o-mini",
//                    messages = new[] {
//                new { role = "system", content = request.SystemRole ?? "אתה מומחה מוזיקה, עזור למשתמש" },
//                new { role = "user", content = request.Message }
//            }
//                };

//                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
//                {
//                    Content = JsonContent.Create(prompt)
//                };

//                httpRequest.Headers.Add("Authorization", $"Bearer {myApiKey}");


//                var response = await client.SendAsync(httpRequest);
//                var content = await response.Content.ReadAsStringAsync();

//                return Ok(new { response = content });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }
//    }
//    // Request/Response Models
//    namespace YourMusicWebsite.Models
//    {
//        public class ChatRequest
//        {
//            public string Message { get; set; }
//            public string SystemRole { get; set; }
//        }

//        public class ChatResponse
//        {
//            public string Message { get; set; }
//        }

//        public class MusicRecommendationRequest
//        {
//            public string Preferences { get; set; }
//        }
//    }
//}







namespace SingleZone.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatApiController : ControllerBase
    {

        private readonly HttpClient client = new HttpClient();
        string openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");


        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            try
            {
                var prompt = new
                {
                    model = "gpt-4o-mini",
                    messages = new[] {
                new { role = "system", content = request.SystemRole ?? "אתה מומחה לציורים, עזור למשתמש, תענה רק על שאלות שקשורות לציורים ואומנות" },
                new { role = "user", content = request.Message }
            }
                };

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = JsonContent.Create(prompt)
                };
                httpRequest.Headers.Add("Authorization", $"Bearer {openAiKey}");

                var response = await client.SendAsync(httpRequest);
                var content = await response.Content.ReadAsStringAsync();

                return Ok(new { response = content });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
    // Request/Response Models
    namespace YourMusicWebsite.Models
    {
        public class ChatRequest
        {
            public string Message { get; set; }
            public string SystemRole { get; set; }
        }

        public class ChatResponse
        {
            public string Message { get; set; }
        }

        public class MusicRecommendationRequest
        {
            public string Preferences { get; set; }
        }
    }
}

