using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kyoto.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Group> Children { get; set; }

        public Group()
        {
            Children = new List<Group>();
        }
    }
}
