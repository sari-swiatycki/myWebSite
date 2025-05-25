//// .NET Controller
//using Amazon.S3;
//using Amazon.S3.Model;
//using Microsoft.AspNetCore.Mvc;

//[ApiController]
//[Route("api/upload")]
//public class UploadController : ControllerBase
//{
//    private readonly IAmazonS3 _s3Client;

//    public UploadController(IAmazonS3 s3Client)
//    {
//        _s3Client = s3Client;
//    }
//    private readonly string[] _allowedExtensions = { ".mp3", ".wav", ".ogg", ".aac", ".flac" };
//    [HttpGet("presigned-url")]
//    public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
//    {
//        var request = new GetPreSignedUrlRequest
//        {
//            BucketName = "sari-songs-bucket",
//            Key = fileName,
//            Verb = HttpVerb.PUT,
//            Expires = DateTime.UtcNow.AddMinutes(5),
//            ContentType = "audio/mpeg" // או סוג הקובץ המתאים
//        };



//        string url = _s3Client.GetPreSignedURL(request);
//        return Ok(new { url });
//    }




//    //[HttpGet("presigned-url")]
//    //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
//    //{
//    //    var extension = Path.GetExtension(fileName).ToLower();

//    //    // אם הסיומת לא ברשימה, החזרת שגיאה
//    //    if (!_allowedExtensions.Contains(extension))
//    //    {
//    //        return BadRequest("Only audio files are allowed (.mp3, .wav, .ogg, .aac, .flac)");
//    //    }

//    //    string contentType = extension switch
//    //    {
//    //        ".mp3" => "audio/mpeg",
//    //        ".wav" => "audio/wav",
//    //        ".ogg" => "audio/ogg",
//    //        ".aac" => "audio/aac",
//    //        ".flac" => "audio/flac",
//    //        _ => "application/octet-stream" // ברירת מחדל (לא אמור לקרות בגלל הבדיקה)
//    //    };

//    //    var request = new GetPreSignedUrlRequest
//    //    {
//    //        BucketName = "studystream",
//    //        Key = fileName,
//    //        Verb = HttpVerb.PUT,
//    //        Expires = DateTime.UtcNow.AddMinutes(5),
//    //        ContentType = contentType
//    //    };

//    //    string url = _s3Client.GetPreSignedURL(request);
//    //    return Ok(new { url });
//    //}




//    [HttpGet("download-url/{fileName}")]
//    public async Task<string> GetDownloadUrlAsync(string fileName)
//    {
//        var request = new GetPreSignedUrlRequest
//        {
//            BucketName = "sari-songs-bucket",
//            Key = fileName,
//            Verb = HttpVerb.GET,
//            Expires = DateTime.UtcNow.AddMinutes(60),
//        };

//        return _s3Client.GetPreSignedURL(request);
//    }
//}















//using Amazon.S3;
//using Amazon.S3.Model;
//using Microsoft.AspNetCore.Mvc;
//using SingleZone.Core.DTOs;
//using SingleZone.Core.entities;
//using SingleZone.Core.Interfaces.ServiceInterface;
//using AutoMapper;
//using System;
//using System.Threading.Tasks;

//namespace SingleZone.API.Controllers
//{
//    [ApiController]
//    [Route("api/upload")]
//    public class UploadController : ControllerBase
//    {
//        private readonly IAmazonS3 _s3Client;
//        private readonly ISongsService _songsService;
//        private readonly IMapper _mapper;

//        public UploadController(IAmazonS3 s3Client, ISongsService songsService, IMapper mapper)
//        {
//            _s3Client = s3Client;
//            _songsService = songsService;
//            _mapper = mapper;
//        }

//        [HttpGet("presigned-url")]
//        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
//        {
//            try
//            {
//                var request = new GetPreSignedUrlRequest
//                {
//                    BucketName = "sari-songs-bucket",
//                    Key = fileName,
//                    Verb = HttpVerb.PUT,
//                    Expires = DateTime.UtcNow.AddMinutes(5),
//                    ContentType = "audio/mpeg"
//                };

//                string url = _s3Client.GetPreSignedURL(request);
//                return Ok(new { url });
//            }
//            catch (AmazonS3Exception ex)
//            {
//                return BadRequest($"S3 Error: {ex.Message}");
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Internal Server Error: {ex.Message}");
//            }
//        }

//        [HttpGet("download-url/{fileName}")]
//        public async Task<IActionResult> GetDownloadUrlAsync(string fileName)
//        {
//            try
//            {
//                var request = new GetPreSignedUrlRequest
//                {
//                    BucketName = "sari-songs-bucket",
//                    Key = fileName,
//                    Verb = HttpVerb.GET,

//                };

//                string url = _s3Client.GetPreSignedURL(request);
//                return Ok(url);
//            }
//            catch (AmazonS3Exception ex)
//            {
//                return BadRequest($"S3 Error: {ex.Message}");
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Internal Server Error: {ex.Message}");
//            }
//        }

//        [HttpPost("save-song")]
//        public async Task<IActionResult> SaveSong([FromBody] SongDto songDto)
//        {
//            if (songDto == null)
//            {
//                return BadRequest("Invalid song data");
//            }

//            try
//            {
//                var addedSong = _songsService.AddSong(songDto);
//                if (addedSong == null)
//                {
//                    return BadRequest("Failed to save song");
//                }

//                return Ok("Song saved successfully");
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Internal Server Error: {ex.Message}");
//            }
//        }
//    }
//}














using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using SingleZone.Core.DTOs;
using SingleZone.Core.Interfaces.ServiceInterface;
using AutoMapper;
using System;
using System.Threading.Tasks;
using Amazon.S3.Model;

//namespace SingleZone.API.Controllers
//{
//    [ApiController]
//    [Route("api/upload")]
//    public class UploadController : ControllerBase
//    {
//        private readonly IAmazonS3 _s3Client;
//        private readonly ISongsService _songsService;
//        private readonly IMapper _mapper;
//        private readonly string _bucketName = "sari-songs-bucket"; // שם הבאקט שלך

//        public UploadController(IAmazonS3 s3Client, ISongsService songsService, IMapper mapper)
//        {
//            _s3Client = s3Client;
//            _songsService = songsService;
//            _mapper = mapper;
//        }


//        //[HttpGet("presigned-url")]
//        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
//        //{
//        //    var request = new GetPreSignedUrlRequest
//        //    {
//        //        BucketName = "sari-songs-bucket",
//        //        Key = fileName,
//        //        Verb = HttpVerb.PUT,
//        //        Expires = DateTime.UtcNow.AddMinutes(5),
//        //        ContentType = "audio/mpeg" // או סוג הקובץ המתאים
//        //    };

//        //    string url = _s3Client.GetPreSignedURL(request);
//        //    return Ok(new { url });
//        //}


//        //[HttpGet("download-url/{fileName}")]
//        //public async Task<IActionResult> GetDownloadUrlAsync(string fileName)
//        //{
//        //    try
//        //    {

//        //        string url = $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
//        //        return Ok(url);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
//        //    }
//        //}

//        [HttpPost("save-song")]
//        public async Task<IActionResult> SaveSong([FromBody] SongDto songDto)
//        {
//            if (songDto == null)
//            {
//                return BadRequest("Invalid song data");
//            }

//            try
//            {
//                var addedSong = _songsService.AddSong(songDto);
//                if (addedSong == null)
//                {
//                    return BadRequest("Failed to save song");
//                }

//                return Ok("Song saved successfully");
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Internal Server Error: {ex.Message}");
//            }
//        }









//        private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp",".mp3" };



//        [HttpGet("presigned-url")]
//        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
//        {
//            var extension = Path.GetExtension(fileName).ToLower();

//            string contentType = extension switch
//            {
//                ".jpg" => "image/jpeg",
//                ".jpeg" => "image/jpeg",
//                ".png" => "image/png",
//                ".gif" => "image/gif",
//                ".bmp" => "image/bmp",
//                ".webp" => "image/webp",
//                ".mp3"=> "audio/mpeg",
//                _ => "application/octet-stream",
//            };

//            var request = new GetPreSignedUrlRequest
//            {
//                BucketName = "sari-songs-bucket",
//                Key = fileName,
//                Verb = HttpVerb.PUT,
//                Expires = DateTime.UtcNow.AddMinutes(5),
//                ContentType = contentType
//            };

//            string url = _s3Client.GetPreSignedURL(request);
//            return Ok(new { url });
//        }


//        [HttpGet("download-url/{fileName}")]
//        public async Task<string> GetDownloadUrlAsync(string fileName)
//        {
//            var request = new GetPreSignedUrlRequest
//            {
//                BucketName = "sari-songs-bucket",
//                Key = fileName,
//                Verb = HttpVerb.GET,
//                Expires = DateTime.UtcNow.AddDays(300),
//            };

//            return _s3Client.GetPreSignedURL(request);
//        }
//    }
//}










using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using SingleZone.Core.DTOs;
using SingleZone.Core.Interfaces.ServiceInterface;
using AutoMapper;
using System;
using System.IO;
using System.Threading.Tasks;
using Amazon.S3.Model;
using TagLib;
using Microsoft.AspNetCore.Authorization;

namespace SingleZone.API.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly ISongsService _songsService;
        private readonly IMapper _mapper;
        private readonly string _bucketName = "sari-songs-bucket"; // שם הבאקט שלך

        public UploadController(IAmazonS3 s3Client, ISongsService songsService, IMapper mapper)
        {
            _s3Client = s3Client;
            _songsService = songsService;
            _mapper = mapper;
        }

        [HttpPost("save-song")]
        [Authorize]
        public async Task<IActionResult> SaveSong([FromBody] SongDto songDto)
        {
            if (songDto == null)
            {
                return BadRequest("Invalid song data");
            }

            try
            {
                // קריאת תגי ID3 ונתוני תמונה מהקובץ ב-S3
                songDto.pictureUrl = await GetSongImageData(songDto.AudioUrl);
                Console.WriteLine("sdertfyguhijko,lp.asdxfcgvhjnkhnbgtfrdtfg;dertfgyhu" + songDto.pictureUrl);
                var addedSong = _songsService.AddSongAsync(songDto);
                if (addedSong == null)
                {
                    return BadRequest("Failed to save song");
                }

                return Ok("Song saved successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".mp3" };

        [HttpGet("presigned-url")]
        [Authorize]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLower();

            string contentType = extension switch
            {
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                ".webp" => "image/webp",
                ".mp3" => "audio/mpeg",
                _ => "application/octet-stream",
            };

            var request = new GetPreSignedUrlRequest
            {
                BucketName = "sari-songs-bucket",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = contentType
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }

        [HttpGet("download-url/{fileName}")]
        [Authorize]
        public async Task<string> GetDownloadUrlAsync(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "sari-songs-bucket",
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddDays(300),
            };
            string ss= _s3Client.GetPreSignedURL(request);

            Console.WriteLine(ss);

            return ss;
        }





        [HttpDelete("{fileName}")]
       
        public async Task<IActionResult> DeleteFileAsync(string fileName)
        {
            try
            {
                // קודם נבדוק אם הקובץ קיים
                var metadataRequest = new GetObjectMetadataRequest
                {
                    BucketName = "sari-songs-bucket",
                    Key = fileName
                };

                try
                {
                    var metadataResponse = await _s3Client.GetObjectMetadataAsync(metadataRequest);
                }
                catch (AmazonS3Exception ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return NotFound(new { message = $"File '{fileName}' not found." });
                }

                // אם הקובץ קיים - מוחקים אותו
                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = "sari-songs-bucket",
                    Key = fileName
                };

                await _s3Client.DeleteObjectAsync(deleteRequest);

                return Ok(new { message = $"File '{fileName}' was deleted successfully." });
            }
            catch (AmazonS3Exception s3Ex)
            {
                return StatusCode((int)s3Ex.StatusCode, new { error = s3Ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private async Task<string> GetSongImageData(string audioUrl)
        {
            try
            {
                var response = await _s3Client.GetObjectAsync(_bucketName, audioUrl);
                using (var memoryStream = new MemoryStream())
                {
                    await response.ResponseStream.CopyToAsync(memoryStream);
                    memoryStream.Position = 0;

                    // צור מופע חדש של MemoryStream מהבייטים
                    var file = TagLib.File.Create(new StreamFileAbstraction(new MemoryStream(memoryStream.ToArray()), audioUrl));
                    if (file.Tag.Pictures.Length >= 1)
                    {
                        var picture = file.Tag.Pictures[0];
                        return Convert.ToBase64String(picture.Data.Data);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing {audioUrl}: {ex.Message}");
            }
            return null;
        }

        // קלאס עזר עבור TagLib ו-S3
        public class AmazonS3StreamFileAbstraction : TagLib.File.IFileAbstraction
        {
            private Stream _stream;
            private string _key;
            private IAmazonS3 _s3Client;
            private string _bucketName;

            public AmazonS3StreamFileAbstraction(Stream stream, string key, IAmazonS3 s3Client, string bucketName)
            {
                _stream = stream;
                _key = key;
                _s3Client = s3Client;
                _bucketName = bucketName;
            }

            public string Name { get { return _key; } }

            public Stream ReadStream { get { return _stream; } }

            public Stream WriteStream { get { throw new NotImplementedException(); } }

            public void CloseStream(Stream stream)
            {
                stream.Dispose();
            }
        }
    }




  
}



public class StreamFileAbstraction : TagLib.File.IFileAbstraction
{
    private readonly Stream _stream;
    private readonly string _fileName;

    public StreamFileAbstraction(Stream stream, string fileName)
    {
        _stream = stream;
        _fileName = fileName;
    }

    public string Name => _fileName;
    public Stream ReadStream => _stream;
    public Stream WriteStream => throw new NotSupportedException();
    public void CloseStream(Stream stream) => stream.Dispose();
}


