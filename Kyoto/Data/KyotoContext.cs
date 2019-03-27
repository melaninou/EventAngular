using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Kyoto.Models
{
    public class KyotoContext : DbContext
    {
        public KyotoContext (DbContextOptions<KyotoContext> options)
            : base(options)
        {
        }

        public DbSet<Kyoto.Models.PostItem> PostItem { get; set; }
    }
}
