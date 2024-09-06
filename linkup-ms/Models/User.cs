using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace linkup_ms.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public bool IsConfirmed { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Sector { get; set; }
        [Required]
        public UserRole Role { get; set; }
    }
}