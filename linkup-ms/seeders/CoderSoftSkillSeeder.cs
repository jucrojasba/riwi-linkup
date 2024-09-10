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
                new CoderSoftSkill {Id = 1, CoderId = 1, SoftSkillId = 1 },
                new CoderSoftSkill {Id = 2, CoderId = 2, SoftSkillId = 2 },
                new CoderSoftSkill {Id = 3, CoderId = 3, SoftSkillId = 3 },
                new CoderSoftSkill {Id = 4, CoderId = 4, SoftSkillId = 4 },
                new CoderSoftSkill {Id = 5, CoderId = 5, SoftSkillId = 5 },
                new CoderSoftSkill {Id = 6, CoderId = 6, SoftSkillId = 6 },
                new CoderSoftSkill {Id = 7, CoderId = 7, SoftSkillId = 7 },
                new CoderSoftSkill {Id = 8, CoderId = 8, SoftSkillId = 8 },
                new CoderSoftSkill {Id = 9, CoderId = 9, SoftSkillId = 9 },
                new CoderSoftSkill {Id = 10, CoderId = 10, SoftSkillId = 10 }
            );
        }
    }
}