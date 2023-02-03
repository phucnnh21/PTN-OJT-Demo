using AutoMapper;
using IMP.EFCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.AppServices
{
    public class PaginationProfile : Profile
    {
        public PaginationProfile()
        {
            CreateMap<UserPaginationRequestDto, UserPaginationDbDto>();
        }
    }
}
