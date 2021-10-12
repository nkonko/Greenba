namespace GreenbaAPI.Dtos
{
    public class ChangePasswordDto
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
