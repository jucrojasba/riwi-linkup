using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class CoderLanguageLevelSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CoderLanguageLevel>().HasData(
                new CoderLanguageLevel { CoderId = 1, LanguageLevelId = 1},
                new CoderLanguageLevel { CoderId = 2, LanguageLevelId = 3},
                new CoderLanguageLevel { CoderId = 3, LanguageLevelId = 2},
                new CoderLanguageLevel { CoderId = 4, LanguageLevelId = 4},
                new CoderLanguageLevel { CoderId = 5, LanguageLevelId = 5},
                new CoderLanguageLevel { CoderId = 6, LanguageLevelId = 2},
                new CoderLanguageLevel { CoderId = 7, LanguageLevelId = 3},
                new CoderLanguageLevel { CoderId = 8, LanguageLevelId = 4},
                new CoderLanguageLevel { CoderId = 9, LanguageLevelId = 6},
                new CoderLanguageLevel { CoderId = 10, LanguageLevelId = 3}
            );
        }
    }
}