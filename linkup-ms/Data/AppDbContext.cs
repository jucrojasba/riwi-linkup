using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;
using linkup_ms.seeders;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Coder> Coders { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<SoftSkill> SoftSkills { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<LanguageLevel> LanguageLevels { get; set; }
        public DbSet<TechnicalSkill> TechnicalSkills { get; set; }
        public DbSet<TechnicalSkillLevel> TechnicalSkillLevels { get; set; }
        public DbSet<CoderSoftSkill> CoderSoftSkills { get; set; }
        public DbSet<CoderLanguageLevel> CoderLanguageLevels { get; set; }
        public DbSet<CoderTechnicalSkillLevel> CoderTechnicalSkillLevels { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data
            GenderSeeder.Seed(modelBuilder);

            // Configure many-to-many relationship for CoderSoftSkill
            modelBuilder.Entity<CoderSoftSkill>()
                .HasKey(css => new { css.CoderId, css.SoftSkillId });

            modelBuilder.Entity<CoderSoftSkill>()
                .HasOne(css => css.Coder)
                .WithMany(c => c.CoderSoftSkills)
                .HasForeignKey(css => css.CoderId)
                .OnDelete(DeleteBehavior.Cascade); // Elimina entradas en CoderSoftSkills


            modelBuilder.Entity<CoderSoftSkill>()
                .HasOne(css => css.SoftSkill)
                .WithMany(ss => ss.CoderSoftSkills)
                .HasForeignKey(css => css.SoftSkillId)
                .OnDelete(DeleteBehavior.Restrict); // No elimina SoftSkills

            // Configure many-to-many relationship for CoderLanguageLevel
            modelBuilder.Entity<CoderLanguageLevel>()
                .HasKey(cll => new { cll.CoderId, cll.LanguageLevelId });

            modelBuilder.Entity<CoderLanguageLevel>()
                .HasOne(cll => cll.Coder)
                .WithMany(c => c.CoderLanguageLevels)
                .HasForeignKey(cll => cll.CoderId)
                .OnDelete(DeleteBehavior.Cascade);// Elimina entradas en CoderLanguageLevels

            modelBuilder.Entity<CoderLanguageLevel>()
                .HasOne(cll => cll.LanguageLevel)
                .WithMany(ll => ll.CoderLanguageLevels)
                .HasForeignKey(cll => cll.LanguageLevelId)
                .OnDelete(DeleteBehavior.Restrict); // No elimina LanguageLevels

            // Configure many-to-many relationship for CoderTechnicalSkillLevel
            modelBuilder.Entity<CoderTechnicalSkillLevel>()
                .HasKey(ctsl => new { ctsl.CoderId, ctsl.TechnicalSkillLevelId });

            modelBuilder.Entity<CoderTechnicalSkillLevel>()
                .HasOne(ctsl => ctsl.Coder)
                .WithMany(c => c.CoderTechnicalSkillLevels)
                .HasForeignKey(ctsl => ctsl.CoderId)
                .OnDelete(DeleteBehavior.Cascade); // Elimina entradas en CoderTechnicalSkillLevels

            modelBuilder.Entity<CoderTechnicalSkillLevel>()
                .HasOne(ctsl => ctsl.TechnicalSkillLevel)
                .WithMany(tsl => tsl.CoderTechnicalSkillLevels)
                .HasForeignKey(ctsl => ctsl.TechnicalSkillLevelId)
                .OnDelete(DeleteBehavior.Restrict); // No elimina TechnicalSkillLevels
        }

    }
}