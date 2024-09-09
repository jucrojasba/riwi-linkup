using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public class GenderSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Gender>().HasData(
                new Gender { Id = 1, Name = "masculino" },
                new Gender { Id = 2, Name = "femenino" },
                new Gender { Id = 3, Name = "prefiero no indicarlo" }
            );
        }
    }
}
