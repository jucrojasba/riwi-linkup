using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;

namespace linkup_ms.Models
{
    public class CoderTechnicalSkillLevel
    {
        public int CoderId { get; set; }
        public Coder Coder { get; set; }
        
        public int TechnicalSkillLevelId { get; set; }
        public TechnicalSkillLevel TechnicalSkillLevel { get; set; }
    }
}