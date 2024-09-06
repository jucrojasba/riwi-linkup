using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.Models
{
    public class Language
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public ICollection<LanguageLevel> LanguageLevels { get; set; }
    }
}