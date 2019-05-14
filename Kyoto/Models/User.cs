﻿using System.Collections.Generic;

namespace Kyoto.Models
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public string ImageName { get; set; }
        //public List<int> GoingPostIds { get; set; }
        //public List<int> MaybePostIds { get; set; }
        //public List<int> CantGoPostIds { get; set; }

    }
}
