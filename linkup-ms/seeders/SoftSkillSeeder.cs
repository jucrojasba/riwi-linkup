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
            new SoftSkill { Id = 1, Name = "comunicación" },
            new SoftSkill { Id = 2, Name = "trabajo en equipo" },
            new SoftSkill { Id = 3, Name = "resolución de problemas" },
            new SoftSkill { Id = 4, Name = "adaptabilidad" },
            new SoftSkill { Id = 5, Name = "creatividad" },
            new SoftSkill { Id = 6, Name = "gestión del tiempo" },
            new SoftSkill { Id = 7, Name = "liderazgo" },
            new SoftSkill { Id = 8, Name = "inteligencia emocional" },
            new SoftSkill { Id = 9, Name = "pensamiento crítico" },
            new SoftSkill { Id = 10, Name = "resolución de conflictos" }
        );
    }
}

}