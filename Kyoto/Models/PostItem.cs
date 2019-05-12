using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Kyoto.Models.User_Registration;

namespace Kyoto.Models
{
    public class PostItem
    {
        [Key]
        public int ID { get; set; }
        public DateTime Date { get; set; }

        public string Location { get; set; }

        public int GroupId { get; set; }

        public string Heading { get; set; }

        public string Message { get; set; }
        public string Type { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
        public bool HasResponse { get; set; }
        public bool OnDashboard { get; set; }
        //---------------------Creator----------------------------
        public string CreatorUsername { get; set; }
        public string CreatorFirstName { get; set; }
        public string CreatorLastName { get; set; }
        public string CreatorEmail { get; set; }
        public string CreatorId { get; set; }
        //-------------------------Responders----------------------------//
        //public List<User> GoingResponders { get; set; }
        //public List<User> MaybeResponders { get; set; }
        //public List<User> CantGoResponders { get; set; }
    }
}
