﻿using System;

namespace Domain.Entities
{
    public class Log : BaseEntity
    {
        public DateTime Logged { get; set; }

        public string Level { get; set; }

        public string Message { get; set; }

        public string Logger { get; set; }

        public string Callsite { get; set; }

        public string Exception { get; set; }
    }
}