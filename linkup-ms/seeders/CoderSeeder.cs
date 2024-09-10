using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.seeders
{
    public static class CoderSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Coder>().HasData(
                new Coder { Id = 1, Name = "edgar cardona", Birthday = new DateTime(1992, 5, 22, 1, 17, 51, DateTimeKind.Utc), Description = "especialista en front-end", UrlImage = "https://media.licdn.com/dms/image/v2/D4E03AQH22ztGRhoM2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677008729241?e=1731542400&v=beta&t=89RVHJpVnq8_m5ObsEU3CEs0KVrBraYI4gGWdIEuXEM", ClanId = 1, GenderId = 2 },
                new Coder { Id = 2, Name = "nicolas martinez", Birthday = new DateTime(1988, 9, 30, 1, 17, 51, DateTimeKind.Utc), Description = "desarrollador backend", UrlImage = "https://avatars.githubusercontent.com/u/164014608?v=4&size=64", ClanId = 2, GenderId = 1 },
                new Coder { Id = 3, Name = "brayan acosta", Birthday = new DateTime(1995, 3, 10, 1, 17, 51, DateTimeKind.Utc), Description = "desarrolladora de aplicaciones móviles", UrlImage = "https://media.licdn.com/dms/image/v2/C4D03AQHAwWzaQDI6gw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1641180503207?e=1731542400&v=beta&t=A7lWrZBzJ84ZlLdFsvKA73tbZKdP1vfPGuvf3Ah6XH4", ClanId = 2, GenderId = 2 },
                new Coder { Id = 4, Name = "jose barreto", Birthday = new DateTime(1991, 7, 18, 1, 17, 51, DateTimeKind.Utc), Description = "ingeniero devops", UrlImage = "https://media.licdn.com/dms/image/v2/D4E03AQEqn-8BGpvfaw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724345138906?e=1731542400&v=beta&t=wWL1nKrccb9DfJVg8Dz6v49L3AIpunv8gkovi5BpqgQ", ClanId = 3, GenderId = 1 },
                new Coder { Id = 5, Name = "juan arias", Birthday = new DateTime(1993, 11, 5, 1, 17, 51, DateTimeKind.Utc), Description = "diseñadora ui/ux", UrlImage = "https://media.licdn.com/dms/image/v2/D4E03AQGXb8dGisr-wQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724327950529?e=1731542400&v=beta&t=uCMHF7cJT2SfM-4acPddFycPWzAUYFWYr_WofvG2Cf8", ClanId = 4, GenderId = 2 },
                new Coder { Id = 6, Name = "juan rojas", Birthday = new DateTime(1989, 2, 28, 1, 17, 51, DateTimeKind.Utc), Description = "científico de datos", UrlImage = "https://media.licdn.com/dms/image/v2/D4E03AQGyhYNRLL9edg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1681701914743?e=1731542400&v=beta&t=0aYfJifoDREE5dhY4dCSD8IECOotdQqJ5HwtLfAKkxw", ClanId = 1, GenderId = 1 },
                new Coder { Id = 7, Name = "ava martinez", Birthday = new DateTime(1994, 6, 12, 1, 17, 51, DateTimeKind.Utc), Description = "especialista en seguridad", UrlImage = "https://example.com/ava.jpg", ClanId = 4, GenderId = 2 },
                new Coder { Id = 8, Name = "noah anderson", Birthday = new DateTime(1987, 10, 8, 1, 17, 51, DateTimeKind.Utc), Description = "desarrollador de videojuegos", UrlImage = "https://example.com/noah.jpg", ClanId = 1, GenderId = 1 },
                new Coder { Id = 9, Name = "isabella white", Birthday = new DateTime(1996, 4, 25, 1, 17, 51, DateTimeKind.Utc), Description = "desarrolladora de blockchain", UrlImage = "https://example.com/isabella.jpg", ClanId = 2, GenderId = 2 },
                new Coder { Id = 10, Name = "alex johnson", Birthday = new DateTime(1990, 1, 15, 1, 17, 51, DateTimeKind.Utc), Description = "desarrollador full-stack", UrlImage = "https://example.com/alex.jpg", ClanId = 3, GenderId = 1 }
            );
        }
    }

}