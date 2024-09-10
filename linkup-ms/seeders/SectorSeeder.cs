using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class SectorSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sector>().HasData(
                new Sector { Id = 1, Name = "tecnología" },
                new Sector { Id = 2, Name = "finanzas" },
                new Sector { Id = 3, Name = "salud" },
                new Sector { Id = 4, Name = "educación" },
                new Sector { Id = 5, Name = "manufactura" }
            );
        }
    }
}