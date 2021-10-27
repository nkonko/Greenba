using System.ComponentModel.DataAnnotations;

namespace GreenbaAPI.Dtos
{
    public class ChangePasswordDto
    {
        public string UserName { get; set; }

        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
                            ErrorMessage = "La contraseña debe contener  1 mayuscula, minisculas, 1 numero y signo y por lo menos 6 caracteres de largo")]
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
