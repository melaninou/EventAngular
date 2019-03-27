using System.ComponentModel.DataAnnotations;

namespace Kyoto.Models
{
    public class PostItem
    {
        [Key]
        public int ID;

        public string _time;

        public string _date;

        public string _location;

        public string _group;

        public string _heading;

        public string _message;
    }
}
