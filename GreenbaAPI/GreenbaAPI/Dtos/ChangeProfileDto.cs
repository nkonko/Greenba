namespace GreenbaAPI.Dtos
{
    public class ChangeProfileDto
    {
        public string UserName { get; set; }

        public string NewUserName { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
