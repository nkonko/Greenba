using System.Collections.Generic;
using Business.Interfaces;

namespace Business.Email
{
    public class EmailBuilder : IEmailBuilder
    {
        public string Build(string template, Dictionary<string, string> replacements)
        {
            foreach (var replacement in replacements)
            {
                template = template.Replace(replacement.Key, replacement.Value);
            }

            return template;
        }
    }
}
