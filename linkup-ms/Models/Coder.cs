using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.Models
{
    public class Coder
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(255)]
        public string UrlImage { get; set; }

        [Required]
        public int GenderId { get; set; }
        public Gender Gender { get; set; }

        public ICollection<CoderSoftSkill> CoderSoftSkills { get; set; }
        public ICollection<CoderLanguageLevel> CoderLanguageLevels { get; set; }
        public ICollection<CoderTechnicalSkillLevel> CoderTechnicalSkillLevels { get; set; }
    }
}

