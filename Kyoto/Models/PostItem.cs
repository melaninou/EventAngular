using System.ComponentModel.DataAnnotations;

namespace Kyoto.Models
{
    public class PostItem
    {
        [Key]
        public int ID { get; set; }

        public string Time { get; set; }
        public string Date { get; set; }

        public string Location { get; set; }

        public string Group { get; set; }

        public string Heading { get; set; }

        public string Message { get; set; }
        public string Type { get; set; }
    }
}
