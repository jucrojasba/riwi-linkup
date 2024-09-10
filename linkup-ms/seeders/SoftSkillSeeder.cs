using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class SoftSkillSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SoftSkill>().HasData(
                new SoftSkill { Name = "comunicación" },
                new SoftSkill { Name = "trabajo en equipo" },
                new SoftSkill { Name = "resolución de problemas" },
                new SoftSkill { Name = "adaptabilidad" },
                new SoftSkill { Name = "creatividad" },
                new SoftSkill { Name = "gestión del tiempo" },
                new SoftSkill { Name = "liderazgo" },
                new SoftSkill { Name = "inteligencia emocional" },
                new SoftSkill { Name = "pensamiento crítico" },
                new SoftSkill { Name = "resolución de conflictos" }
            );
        }
    }

}