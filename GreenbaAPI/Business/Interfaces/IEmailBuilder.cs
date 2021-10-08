using System.Collections.Generic;

namespace Business.Interfaces
{
    public interface IEmailBuilder
    {
        string Build(string template, Dictionary<string, string> replacements);
    }
}
