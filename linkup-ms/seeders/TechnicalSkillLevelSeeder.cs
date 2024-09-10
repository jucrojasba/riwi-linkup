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
                new TechnicalSkillLevel {Name = "junior" },
                new TechnicalSkillLevel {Name = "semi-senior" },
                new TechnicalSkillLevel {Name = "senior" }
            );
        }
    }
}