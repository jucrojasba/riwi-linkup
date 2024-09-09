using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.DTOS
{
    public class CoderDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GenderName { get; set; }
        public string ClanName { get; set; }
        public List<string> SoftSkills { get; set; }
        public List<LanguageLevelDto> LanguageLevels { get; set; }
        public List<TechnicalSkillDto> TechnicalSkillLevels { get; set; }
    }
}