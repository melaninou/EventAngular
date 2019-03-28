using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Kyoto.Models;

namespace Kyoto.Models
{
    public class KyotoContext : DbContext
    {
        public KyotoContext (DbContextOptions<KyotoContext> options)
            : base(options)
        {
        }

        public DbSet<Kyoto.Models.PostItem> PostItem { get; set; }

        public DbSet<Kyoto.Models.GroupItem> GroupItem { get; set; }
    }
}
