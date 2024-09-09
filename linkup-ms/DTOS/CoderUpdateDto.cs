using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.DTOS
{
    public class CoderUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public string Description { get; set; }
        public string UrlImage { get; set; }
        public string ClanName { get; set; }
        public int GenderId { get; set; }
        public List<int> SoftSkillIds { get; set; }
        public List<LanguageWithLevelDto> Languages { get; set; }
        public List<TechnicalSkillWithLevelDto> TechnicalSkills { get; set; }
    }
}