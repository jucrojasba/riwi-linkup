using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;

namespace linkup_ms.Models
{
    public class CoderSoftSkill
    {
        public int CoderId { get; set; }
        public Coder Coder { get; set; }
        
        public int SoftSkillId { get; set; }
        public SoftSkill SoftSkill { get; set; }
    }
}