﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Kyoto.Models
{
    public class GroupItem
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Admin { get; set; }
        public int ParentId { get; set; }
        public string Image { get; set; }
    }
}
