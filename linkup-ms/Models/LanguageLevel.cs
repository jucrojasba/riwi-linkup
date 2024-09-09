using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.Models
{
    public class LanguageLevel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        
        public int LanguageId { get; set; }
        public Language Language { get; set; }
        
        public ICollection<CoderLanguageLevel> CoderLanguageLevels { get; set; }
    }
}