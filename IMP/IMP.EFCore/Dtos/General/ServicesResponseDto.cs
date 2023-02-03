namespace IMP.EFCore
{
    public class ServicesResponseDto<T>
    {
        public string? Message { get; set; }
        public int Status { get; set; }
        public T? Data { get; set; }
    }
}
