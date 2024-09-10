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
            new Language {Name = "inglés" },
            new Language {Name = "español" },
            new Language {Name = "francés" },
            new Language {Name = "alemán" },
            new Language {Name = "chino" },
            new Language {Name = "japonés" },
            new Language {Name = "árabe" },
            new Language {Name = "ruso" },
            new Language {Name = "portugués" },
            new Language {Name = "italiano" }
        );
    }
}

}