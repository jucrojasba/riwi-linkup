using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class UserSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User {Name = "jackeline cardona", Email = "jackeline.cardona@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "1234567890", CreatedAt = new DateTime(2024, 2, 15), SectorId = 1, RoleId = 1 },
                new User {Name = "jane smith", Email = "jane.smith@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "2345678901", CreatedAt = new DateTime(2024, 3, 10), SectorId = 2, RoleId = 2 },
                new User {Name = "alice johnson", Email = "alice.johnson@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "3456789012", CreatedAt = new DateTime(2024, 4, 5), SectorId = 1, RoleId = 2 },
                new User {Name = "bob williams", Email = "bob.williams@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "4567890123", CreatedAt = new DateTime(2024, 5, 20), SectorId = 3, RoleId = 2 },
                new User {Name = "charlie brown", Email = "charlie.brown@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "5678901234", CreatedAt = new DateTime(2024, 6, 25), SectorId = 2, RoleId = 2 },
                new User {Name = "diana clark", Email = "diana.clark@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "6789012345", CreatedAt = new DateTime(2024, 7, 10), SectorId = 1, RoleId = 2 },
                new User {Name = "edward davis", Email = "edward.davis@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "7890123456", CreatedAt = new DateTime(2024, 8, 15), SectorId = 3, RoleId = 2 },
                new User {Name = "fiona evans", Email = "fiona.evans@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "8901234567", CreatedAt = new DateTime(2024, 9, 10), SectorId = 2, RoleId = 2 },
                new User {Name = "george fisher", Email = "george.fisher@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "9012345678", CreatedAt = new DateTime(2024, 10, 5), SectorId = 1, RoleId = 2 },
                new User {Name = "hannah green", Email = "hannah.green@example.com", IsConfirmed = true, Password = "riwi123", PhoneNumber = "0123456789", CreatedAt = new DateTime(2024, 11, 1), SectorId = 3, RoleId = 2 }
            );
        }
    }

}