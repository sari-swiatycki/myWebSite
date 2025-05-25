using AutoMapper;
using SingleZone.Core.DTOs;
using SingleZone.Core.entities;

namespace SingleZone.Service
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Songs, SongDto>().ReverseMap();
            CreateMap<PlayList, PlayListDto>().ReverseMap();
            CreateMap<Users, UserDto>().ReverseMap();
        }
    }
}
