using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using linkup_ms.Models;

namespace linkup_ms.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}