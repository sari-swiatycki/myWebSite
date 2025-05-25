using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SingleZone.Core.Dtos;
using SingleZone.Core.Interfaces.ServiceInterface;

namespace SingleZone_.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayListSongController : ControllerBase
    {
        private readonly IPlayListSongService _playListSongService;

        public PlayListSongController(IPlayListSongService playListSongService)
        {
            _playListSongService = playListSongService;
        }

        [HttpPost("add-song")]
        public async Task<IActionResult> AddSongToPlayList([FromBody] AddSongToPlayListRequest request)
        {
            try
            {
                await _playListSongService.AddSongToPlayListAsync(request.PlayListId, request.SongId);
                return Ok("Song added to playlist successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("get-songs/{playListId}")]
        public async Task<IActionResult> GetSongsByPlayListId(int playListId)
        {
            var songs = await _playListSongService.GetSongsByPlayListIdAsync(playListId);
            if (songs == null || !songs.Any())
            {
                return NotFound("No songs found in this playlist.");
            }
            return Ok(songs);
        }





        [HttpDelete("remove-song")]
        public async Task<IActionResult> RemoveSongFromPlayList(int playListId, int songId)
        {
            try
            {
                await _playListSongService.RemoveSongFromPlayListAsync(playListId, songId);
                return Ok("Song removed from playlist successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}

