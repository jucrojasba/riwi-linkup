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
                new TechnicalSkill { Id = 1, Name = "javaScript" },
                new TechnicalSkill { Id = 2, Name = "python" },
                new TechnicalSkill { Id = 3, Name = "java" },
                new TechnicalSkill { Id = 4, Name = "c#" },
                new TechnicalSkill { Id = 5, Name = "sql" },
                new TechnicalSkill { Id = 6, Name = "nextJs" },
                new TechnicalSkill { Id = 7, Name = "nodeJs" },
                new TechnicalSkill { Id = 8, Name = "docker" },
                new TechnicalSkill { Id = 9, Name = "aws" },
                new TechnicalSkill { Id = 10, Name = "machine learning" }
            );
        }
    }
}