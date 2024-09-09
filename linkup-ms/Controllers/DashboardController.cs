// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using linkup_ms.Data;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace linkup_ms.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class DashboardController : ControllerBase
//     {
//         // Dependency injection of the database context
//         private readonly AppDbContext _context;
        
//         // Constructor to initialize the context
//         public DashboardController(AppDbContext context)
//         {
//             _context = context;
//         }

//         // Endpoint to get the count of all coders in training
//         [HttpGet("coders-in-training")]
//         public async Task<int> GetCodersInTrainingCount()
//         {
//             return await _context.Coders.CountAsync();
//         }

//         // Endpoint to get the count of frontend coders with specific skill
//         [HttpGet("frontend-coders")]
//         public async Task<int> GetFrontendCodersCount()
//         {
//             return await _context.Coders
//                 .Where(c => c.CoderTechnicalSkillLevels
//                     .Any(cts => cts.TechnicalSkillLevel.TechnicalSkill.Name == "nextJs"))
//                 .CountAsync();
//         }

//         // Endpoint to get the count of backend coders with specific skills
//         [HttpGet("backend-coders")]
//         public async Task<int> GetBackendCodersCount()
//         {
//             return await _context.Coders
//                 .Where(c => c.CoderTechnicalSkillLevels
//                     .Any(cts => new[] { "c#", "java", "nodeJs" }.Contains(cts.TechnicalSkillLevel.TechnicalSkill.Name)))
//                 .CountAsync();
//         }

//         // Endpoint to get the count of companies grouped by month and year
//         // [HttpGet("companies-by-month")]
//         // public async Task<IActionResult> GetCompaniesByMonth()
//         // {
//         //     var companiesByMonth = await _context.Users
//         //         .Where(u => u.Role.Name == "client")
//         //         .GroupBy(u => new { u.CreatedAt.Year, u.CreatedAt.Month })
//         //         .Select(g => new
//         //         {
//         //             Year = g.Key.Year,
//         //             Month = g.Key.Month,
//         //             Count = g.Count()
//         //         })
//         //         .OrderBy(c => c.Year)
//         //         .ThenBy(c => c.Month)
//         //         .ToListAsync();
                
//         //     return Ok(companiesByMonth);
//         // }
//     }
// }
