using Microsoft.AspNetCore.Mvc;
using SingleZone.Core.DTOs;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces.ServiceInterface;
using AutoMapper;
using System.Collections.Generic;
using SingleZone.Core.entities;
using SingleZone.Service;
using SingleZone.API.PostModales;

namespace SingleZone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly ISongsService _songsService;
        private readonly IMapper _mapper;

        public SongsController(ISongsService songsService, IMapper mapper)
        {
            _songsService = songsService;
            _mapper = mapper;
        }

        // GET: api/Songs
        [HttpGet]
        public ActionResult<List<SongDto>> Get()
        {
            var result = _songsService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound("No songs found.");
            }
            return Ok(result);
        }

        // GET api/Songs/5
        [HttpGet("{id}")]
        public ActionResult<SongDto> GetById(int id)
        {
            if (id < 0) return BadRequest("Invalid ID.");

            var result = _songsService.GetById(id);
            if (result == null)
            {
                return NotFound("Song not found.");
            }
            return Ok(result);
        }

        // POST api/Songs
        [HttpPost]
        public async Task  <ActionResult<SongDto>> Post([FromBody] SongsPostModal songPost)
        {
            if (songPost == null) return BadRequest("Invalid song data.");

           
            var song = _mapper.Map<SongDto>(songPost); // ממיר את ה-DTO לישות            var createdUser = _usersService.AddUser(userDto); // מקבל את המשתמש שנוסף
            var createdSong= await _songsService.AddSongAsync(song); // מקבל את המשתמש שנוסף
            if (createdSong == null)
            {
                return BadRequest("Failed to create user.");
            }
            return Ok(createdSong);

          
        }




   

        // PUT api/Songs/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] SongsPostModal songPost)
        {
            if (id < 0 || songPost == null) return BadRequest("Invalid ID or song data.");

            var song = _mapper.Map<SongDto>(songPost); // ממיר את ה-DTO לישות
            var success = await _songsService.UpdateAsync(id, song);
            if (success == null) return NotFound("Song not found.");

            return Ok(success);
        }

        // DELETE api/Songs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id < 0) return BadRequest("Invalid ID.");

            bool success = await _songsService.RemoveAsync(id);
            if (!success) return NotFound("Song not found.");

            return Ok(success);
        }
    



        [HttpGet("ByCategory/{category}")]
        public ActionResult GetWorksheets(Categories category)
        {
            var worksheets = _songsService.GetSongByCategory(category);
            return Ok(new { worksheets = worksheets });
        }



        [HttpGet("Search/{keyword}")]
        public ActionResult<List<SongDto>> SearchSongs(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                return BadRequest("Keyword cannot be empty.");
            }

            var songs = _songsService.SearchSongsByKeyword(keyword);

            if (songs == null || songs.Count == 0)
            {
                return NotFound("No songs found matching the search term.");
            }

            return Ok(songs);
        }



        [HttpPost("Rate/{id}")]
        public async Task<ActionResult> RateSong(int id, [FromBody] double rating)
        {
            if (rating < 0 || rating > 5) return BadRequest("Rating must be between 0 and 5.");

            var result = await _songsService.AddRatingAsync(id, rating);
            if (!result) return NotFound("Song not found.");

            return Ok("Rating added successfully.");
        }

    }
}
