using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.Models
{
    public class TechnicalSkillLevel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public int TechnicalSkillId { get; set; }
        public TechnicalSkill TechnicalSkill { get; set; }

        public ICollection<CoderTechnicalSkillLevel> CoderTechnicalSkillLevels { get; set; }
    }
}