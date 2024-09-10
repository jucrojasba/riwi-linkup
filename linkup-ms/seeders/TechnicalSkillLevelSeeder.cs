using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class TechnicalSkillLevelSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TechnicalSkillLevel>().HasData(
                new TechnicalSkillLevel { Id = 1, Name = "junior", TechnicalSkillId = 1 },
                new TechnicalSkillLevel { Id = 2, Name = "semi-senior", TechnicalSkillId = 2 },
                new TechnicalSkillLevel { Id = 3, Name = "senior", TechnicalSkillId = 3 }
            );
        }
    }
}