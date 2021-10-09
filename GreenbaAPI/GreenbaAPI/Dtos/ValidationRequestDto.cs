namespace GreenbaAPI.Dtos
{
    public class ValidationRequestDto
    {
        public string Password { get; set; }

        public string OldPassword { get; set; }

        public string UserName { get; set; }
    }
}
