using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class CoderTechnicalSkillLevelSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CoderTechnicalSkillLevel>().HasData(
                new CoderTechnicalSkillLevel { CoderId = 1, TechnicalSkillLevelId = 1},
                new CoderTechnicalSkillLevel { CoderId = 2, TechnicalSkillLevelId = 3},
                new CoderTechnicalSkillLevel { CoderId = 3, TechnicalSkillLevelId = 2},
                new CoderTechnicalSkillLevel { CoderId = 4, TechnicalSkillLevelId = 1},
                new CoderTechnicalSkillLevel { CoderId = 5, TechnicalSkillLevelId = 3},
                new CoderTechnicalSkillLevel { CoderId = 6, TechnicalSkillLevelId = 2},
                new CoderTechnicalSkillLevel { CoderId = 7, TechnicalSkillLevelId = 3},
                new CoderTechnicalSkillLevel { CoderId = 8, TechnicalSkillLevelId = 1},
                new CoderTechnicalSkillLevel { CoderId = 9, TechnicalSkillLevelId = 1},
                new CoderTechnicalSkillLevel { CoderId = 10, TechnicalSkillLevelId = 3}
            );
        }
    }
}