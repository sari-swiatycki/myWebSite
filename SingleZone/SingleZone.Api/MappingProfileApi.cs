using AutoMapper;
using SingleZone.Api.PostModales;
using SingleZone.API.PostModales;

using SingleZone.Core.DTOs;
using SingleZone.Core.entities;



namespace SingleZone.API
{
    public class MappingProfileApi:Profile
    {
        public MappingProfileApi()
        {
            CreateMap<UsersPostModal,UserDto>().ReverseMap();
            CreateMap<PlayListPostModal, PlayListDto>().ReverseMap();
            CreateMap<SongsPostModal, SongDto>().ReverseMap();
            //לא בטוחה שצריך
            CreateMap<RegisterModel, UserDto>().ReverseMap();
        }
    }
}
