using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class CoderSoftSkillSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CoderSoftSkill>().HasData(
                new CoderSoftSkill { CoderId = 1, SoftSkillId = 1 },
                new CoderSoftSkill { CoderId = 2, SoftSkillId = 2 },
                new CoderSoftSkill { CoderId = 3, SoftSkillId = 3 },
                new CoderSoftSkill { CoderId = 4, SoftSkillId = 4 },
                new CoderSoftSkill { CoderId = 5, SoftSkillId = 5 },
                new CoderSoftSkill { CoderId = 6, SoftSkillId = 6 },
                new CoderSoftSkill { CoderId = 7, SoftSkillId = 7 },
                new CoderSoftSkill { CoderId = 8, SoftSkillId = 8 },
                new CoderSoftSkill { CoderId = 9, SoftSkillId = 9 },
                new CoderSoftSkill { CoderId = 10, SoftSkillId = 10 }
            );
        }
    }
}