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
                new LanguageLevel { Id = 1, Name = "a1", LanguageId = 1 },
                new LanguageLevel { Id = 2, Name = "a2", LanguageId = 2 },
                new LanguageLevel { Id = 3, Name = "b1", LanguageId = 3 },
                new LanguageLevel { Id = 4, Name = "b2", LanguageId = 2 },
                new LanguageLevel { Id = 5, Name = "c1", LanguageId = 3 },
                new LanguageLevel { Id = 6, Name = "c2", LanguageId = 1 }
            );
        }
    }
}