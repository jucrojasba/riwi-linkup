using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class LanguageSeeder
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Language>().HasData(
            new Language { Id = 1, Name = "inglés" },
            new Language { Id = 2, Name = "español" },
            new Language { Id = 3, Name = "francés" },
            new Language { Id = 4, Name = "alemán" },
            new Language { Id = 5, Name = "chino" }
        );
    }
}

}