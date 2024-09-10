using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace linkup_ms.Models
{
    public class Coder
    {
        [Key]
        [JsonIgnore]
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

        [StringLength(255)]
        public string ClanName { get; set; }

        [Required]
        public int GenderId { get; set; }


        [JsonIgnore]
        public Gender Gender { get; set; }


        [JsonIgnore]

        [Required]
        public int ClanId { get; set; }
        public Clan Clan { get; set; }

        public ICollection<CoderSoftSkill> CoderSoftSkills { get; set; }

        [JsonIgnore]
        public ICollection<CoderLanguageLevel> CoderLanguageLevels { get; set; }

        [JsonIgnore]
        public ICollection<CoderTechnicalSkillLevel> CoderTechnicalSkillLevels { get; set; }
    }
}

