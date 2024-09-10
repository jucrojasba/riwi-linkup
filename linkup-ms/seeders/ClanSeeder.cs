using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public class ClanSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clan>().HasData(
                new Clan { Id = 1, Name = "berners lee" },
                new Clan { Id = 2, Name = "ritchie" },
                new Clan { Id = 3, Name = "gates" },
                new Clan { Id = 4, Name = "jeff bezzos" }
            );
        }
    }
}