using System;
using System.ComponentModel.DataAnnotations;

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
    }
}
