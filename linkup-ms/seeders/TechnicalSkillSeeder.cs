using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class TechnicalSkillSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TechnicalSkill>().HasData(
                new TechnicalSkill {Name = "javaScript" },
                new TechnicalSkill {Name = "python" },
                new TechnicalSkill {Name = "java" },
                new TechnicalSkill {Name = "c#" },
                new TechnicalSkill {Name = "sql" },
                new TechnicalSkill {Name = "nextJs" },
                new TechnicalSkill {Name = "nodeJs" },
                new TechnicalSkill {Name = "docker" },
                new TechnicalSkill {Name = "aws" },
                new TechnicalSkill {Name = "machine learning" }
            );
        }
    }
}