using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.EFCore
{
    public class PaginationRequestDto
    {
        [Range(1, int.MaxValue)]
        public int Page { get; set; } = 1;

        [Range(1, int.MaxValue)]
        public int Size { get; set; } = 5;
    }

    public class GenericQueryDto : PaginationRequestDto
    {
        public string Keyword { get; set; } = "";
        public OrderByQuery? OrderBy { get; set; }
        public string[] SearchColumns { get; set; } = new string[] { };
    }

    public class PaginationResponseDto<T>
    {
        public int Total { get; set; } = 0;

        public IEnumerable<T> Payload { get; set; } = Enumerable.Empty<T>();
    }

    public class OrderByQuery
    {
        public string? FieldName { get; set; }

        public bool IsAscending { get; set; } = false;
    }
}
