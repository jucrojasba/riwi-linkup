using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace linkup_ms.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("coders-in-training")]
        public async Task<int> GetCodersInTrainingCount()
        {
            return await _context.Coders.CountAsync();
        }

        [HttpGet("frontend-coders")]
        public async Task<int> GetFrontendCodersCount()
        {
            return await _context.Coders
                .Where(c => c.CoderTechnicalSkillLevels
                    .Any(cts => cts.TechnicalSkillLevel.TechnicalSkill.Name == "nextJs"))
                .CountAsync();
        }
    }
}