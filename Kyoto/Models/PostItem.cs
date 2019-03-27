using System.ComponentModel.DataAnnotations;

namespace Kyoto.Models
{
    public class PostItem
    {
        [Key]
        public int ID { get; set; }

        public string _time { get; set; }
        public string _date { get; set; }

        public string _location { get; set; }

        public string _group { get; set; }

        public string _heading { get; set; }

        public string _message { get; set; }
    }
}
