using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class LanguageLevelSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LanguageLevel>().HasData(
                new LanguageLevel {Name = "a1" },
                new LanguageLevel {Name = "a2" },
                new LanguageLevel {Name = "b1" },
                new LanguageLevel {Name = "b2" },
                new LanguageLevel {Name = "c1" },
                new LanguageLevel {Name = "c2" }
            );
        }
    }
}