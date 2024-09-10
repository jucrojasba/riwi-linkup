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
                new Sector {Name = "tecnología" },
                new Sector {Name = "finanzas" },
                new Sector {Name = "salud" },
                new Sector {Name = "educación" },
                new Sector {Name = "manufactura" }
            );
        }
    }
}