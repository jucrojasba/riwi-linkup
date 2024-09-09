using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.Models
{
    public class SoftSkill
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public ICollection<CoderSoftSkill> CoderSoftSkills { get; set; }
    }
}