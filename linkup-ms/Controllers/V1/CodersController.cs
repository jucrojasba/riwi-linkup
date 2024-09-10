using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Data;
using linkup_ms.DTOS;
using linkup_ms.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace linkup_ms.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CodersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CodersController(AppDbContext context)
        {
            _context = context;
        }

        //GET
        [HttpGet]
        public async Task<IActionResult> GetCoders()
        {
            var coders = await _context.Coders
                .Include(c => c.Gender)
                .Include(c => c.CoderSoftSkills)
                    .ThenInclude(css => css.SoftSkill)
                .Include(c => c.CoderLanguageLevels)
                    .ThenInclude(cll => cll.LanguageLevel)
                        .ThenInclude(ll => ll.Language)
                .Include(c => c.CoderTechnicalSkillLevels)
                    .ThenInclude(ctsl => ctsl.TechnicalSkillLevel)
                        .ThenInclude(tsl => tsl.TechnicalSkill)
                .Select(c => new CoderDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    GenderName = c.Gender.Name,
                    ClanName = c.ClanName,
                    SoftSkills = c.CoderSoftSkills.Select(css => css.SoftSkill.Name).ToList(),
                    LanguageLevels = c.CoderLanguageLevels.Select(cll => new LanguageLevelDto
                    {
                        LevelName = cll.LanguageLevel.Name,
                        LanguageName = cll.LanguageLevel.Language.Name
                    }).ToList(),
                    TechnicalSkillLevels = c.CoderTechnicalSkillLevels.Select(ctsl => new TechnicalSkillDto
                    {
                        LevelName = ctsl.TechnicalSkillLevel.Name,
                        TechnicalSkillName = ctsl.TechnicalSkillLevel.TechnicalSkill.Name
                    }).ToList()
                })
                .ToListAsync();

            return Ok(coders);
        }

        //GET / id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCoder(int id)
        {
            var coder = await _context.Coders
                .Include(c => c.Gender)
                .Include(c => c.CoderSoftSkills)
                    .ThenInclude(css => css.SoftSkill)
                .Include(c => c.CoderLanguageLevels)
                    .ThenInclude(cll => cll.LanguageLevel)
                        .ThenInclude(ll => ll.Language)
                .Include(c => c.CoderTechnicalSkillLevels)
                    .ThenInclude(ctsl => ctsl.TechnicalSkillLevel)
                        .ThenInclude(tsl => tsl.TechnicalSkill)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (coder == null)
            {
                return NotFound();
            }

            var coderDto = new CoderDto
            {
                Id = coder.Id,
                Name = coder.Name,
                ClanName = coder.ClanName,
                GenderName = coder.Gender.Name,
                SoftSkills = coder.CoderSoftSkills.Select(css => css.SoftSkill.Name).ToList(),
                LanguageLevels = coder.CoderLanguageLevels.Select(cll => new LanguageLevelDto
                {
                    LevelName = cll.LanguageLevel.Name,
                    LanguageName = cll.LanguageLevel.Language.Name
                }).ToList(),
                TechnicalSkillLevels = coder.CoderTechnicalSkillLevels.Select(ctsl => new TechnicalSkillDto
                {
                    LevelName = ctsl.TechnicalSkillLevel.Name,
                    TechnicalSkillName = ctsl.TechnicalSkillLevel.TechnicalSkill.Name
                }).ToList()
            };

            return Ok(coderDto);
        }

        //POST
        [HttpPost]
        public async Task<IActionResult> CreateCoder([FromBody] Coder newCoder)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Coders.Add(newCoder);
            await _context.SaveChangesAsync();

            return Created();
        }




        //PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCoder(int id, [FromBody] CoderUpdateDto coderDto)
        {
            if (id != coderDto.Id)
            {
                return BadRequest();
            }

            var existingCoder = await _context.Coders
                .Include(c => c.CoderSoftSkills)
                .Include(c => c.CoderLanguageLevels)
                .Include(c => c.CoderTechnicalSkillLevels)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (existingCoder == null)
            {
                return NotFound();
            }

            // Update basic properties
            existingCoder.Name = coderDto.Name.ToLower();
            existingCoder.Birthday = coderDto.Birthday;
            existingCoder.Description = coderDto.Description.ToLower();
            existingCoder.UrlImage = coderDto.UrlImage.ToLower();
            existingCoder.ClanName = coderDto.ClanName.ToLower();
            existingCoder.GenderId = coderDto.GenderId;

            // Clear existing relationships
            _context.CoderSoftSkills.RemoveRange(existingCoder.CoderSoftSkills);
            _context.CoderLanguageLevels.RemoveRange(existingCoder.CoderLanguageLevels);
            _context.CoderTechnicalSkillLevels.RemoveRange(existingCoder.CoderTechnicalSkillLevels);

            // Add new relationships
            foreach (var softSkillId in coderDto.SoftSkillIds)
            {
                _context.CoderSoftSkills.Add(new CoderSoftSkill { CoderId = id, SoftSkillId = softSkillId });
            }

            foreach (var language in coderDto.Languages)
            {
                var languageLevel = await _context.LanguageLevels
                    .FirstOrDefaultAsync(ll => ll.LanguageId == language.LanguageId && ll.Id == language.LevelId);

                if (languageLevel != null)
                {
                    _context.CoderLanguageLevels.Add(new CoderLanguageLevel { CoderId = id, LanguageLevelId = languageLevel.Id });
                }
            }

            foreach (var technicalSkill in coderDto.TechnicalSkills)
            {
                var technicalSkillLevel = await _context.TechnicalSkillLevels
                    .FirstOrDefaultAsync(tsl => tsl.TechnicalSkillId == technicalSkill.TechnicalSkillId && tsl.Id == technicalSkill.LevelId);

                if (technicalSkillLevel != null)
                {
                    _context.CoderTechnicalSkillLevels.Add(new CoderTechnicalSkillLevel { CoderId = id, TechnicalSkillLevelId = technicalSkillLevel.Id });
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //PATCH
        [HttpPatch("{id}")]
        [Consumes("application/json-patch+json")]
        public async Task<IActionResult> PatchCoder(int id, [FromBody] JsonPatchDocument<CoderPatchDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Patch document is null");
            }

            var coder = await _context.Coders
                .Include(c => c.CoderSoftSkills)
                .Include(c => c.CoderLanguageLevels)
                .Include(c => c.CoderTechnicalSkillLevels)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (coder == null)
            {
                return NotFound();
            }

            var coderPatchDto = new CoderPatchDto
            {
                Name = coder.Name,
                Birthday = coder.Birthday,
                Description = coder.Description,
                UrlImage = coder.UrlImage,
                ClanName = coder.ClanName,
                GenderId = coder.GenderId,
                SoftSkillIds = coder.CoderSoftSkills.Select(css => css.SoftSkillId).ToList(),
                Languages = coder.CoderLanguageLevels.Select(cll => new LanguageWithLevelDto
                {
                    LanguageId = cll.LanguageLevel.LanguageId,
                    LevelId = cll.LanguageLevel.Id
                }).ToList(),
                TechnicalSkills = coder.CoderTechnicalSkillLevels.Select(ctsl => new TechnicalSkillWithLevelDto
                {
                    TechnicalSkillId = ctsl.TechnicalSkillLevel.TechnicalSkillId,
                    LevelId = ctsl.TechnicalSkillLevel.Id
                }).ToList()
            };

            patchDoc.ApplyTo(coderPatchDto, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Update basic properties
            coder.Name = coderPatchDto.Name?.ToLower() ?? coder.Name;
            coder.Birthday = coderPatchDto.Birthday ?? coder.Birthday;
            coder.Description = coderPatchDto.Description?.ToLower() ?? coder.Description;
            coder.UrlImage = coderPatchDto.UrlImage?.ToLower() ?? coder.UrlImage;
            coder.ClanName = coderPatchDto.ClanName?.ToLower() ?? coder.ClanName;
            coder.GenderId = coderPatchDto.GenderId ?? coder.GenderId;

            // Update relationships
            if (coderPatchDto.SoftSkillIds != null)
            {
                _context.CoderSoftSkills.RemoveRange(coder.CoderSoftSkills);
                foreach (var skillId in coderPatchDto.SoftSkillIds)
                {
                    _context.CoderSoftSkills.Add(new CoderSoftSkill { CoderId = id, SoftSkillId = skillId });
                }
            }

            if (coderPatchDto.Languages != null)
            {
                _context.CoderLanguageLevels.RemoveRange(coder.CoderLanguageLevels);
                foreach (var language in coderPatchDto.Languages)
                {
                    var languageLevel = await _context.LanguageLevels
                        .FirstOrDefaultAsync(ll => ll.LanguageId == language.LanguageId && ll.Id == language.LevelId);

                    if (languageLevel != null)
                    {
                        _context.CoderLanguageLevels.Add(new CoderLanguageLevel { CoderId = id, LanguageLevelId = languageLevel.Id });
                    }
                }
            }

            if (coderPatchDto.TechnicalSkills != null)
            {
                _context.CoderTechnicalSkillLevels.RemoveRange(coder.CoderTechnicalSkillLevels);
                foreach (var technicalSkill in coderPatchDto.TechnicalSkills)
                {
                    var technicalSkillLevel = await _context.TechnicalSkillLevels
                        .FirstOrDefaultAsync(tsl => tsl.TechnicalSkillId == technicalSkill.TechnicalSkillId && tsl.Id == technicalSkill.LevelId);

                    if (technicalSkillLevel != null)
                    {
                        _context.CoderTechnicalSkillLevels.Add(new CoderTechnicalSkillLevel { CoderId = id, TechnicalSkillLevelId = technicalSkillLevel.Id });
                    }
                }
            }

            await _context.SaveChangesAsync();

            return Ok("hola");
        }

        //DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoder(int id)
        {
            var coder = await _context.Coders.FindAsync(id);
            if (coder == null)
            {
                return NotFound();
            }

            _context.Coders.Remove(coder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CoderExists(int id)
        {
            return _context.Coders.Any(e => e.Id == id);
        }

    }
}
