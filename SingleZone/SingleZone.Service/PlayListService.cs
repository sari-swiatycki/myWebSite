using AutoMapper;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Core.Interfaces.ServiceInterface;
using SingleZone.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SingleZone.Core.entities;

namespace SingleZone.Service
{
    public class PlayListService : IPlayListService
    {
        readonly IPlayListRepository _repository;
        readonly IMapper _mapper;

        public PlayListService(IPlayListRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public List<PlayListDto> GetList()
        {
            var data = _repository.GetAll();
            return _mapper.Map<List<PlayListDto>>(data);
        }

        public PlayListDto GetById(int id)
        {
            var data = _repository.GetById(id);
            if (data == null) return null;
            return _mapper.Map<PlayListDto>(data);
        }

        public async Task< PlayListDto> AddPlayListAsync(PlayListDto playListDto)
        {
            if (_repository.GetById(playListDto.Id) != null) return null ;

            var playList = _mapper.Map<PlayList>(playListDto);

            playList =await _repository.AddAsync(playList);
            if (playList == null)
            {
                return null;
            }
            return _mapper.Map<PlayListDto>(playList);
        }


    

        public async Task<PlayListDto> UpdateAsync(int id, PlayListDto playListDto)
        {
            var playList = _repository.GetById(id);
            if (playList == null) return null;

            // Map the DTO back to the entity
            var updatedPlayList = _mapper.Map<PlayList>(playListDto);
            updatedPlayList=await _repository.UpdateAsync(updatedPlayList, id);
            return _mapper.Map<PlayListDto>(updatedPlayList);
        }

  
        public async Task<bool> RemoveAsync(int id)
        {
            var playList = _repository.GetById(id);
            if (playList == null) return false;

            return await _repository.DeleteAsync(id);
        }




        public List<PlayList> GetPlaylistsByUserId(int userId)
        {
            return _repository.GetPlaylistsByUserId(userId);
        }
    }
}
