using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kyoto.Models;

namespace Kyoto.Data
{
    public static class DbInitializer
    {
        public static void Initialize(KyotoContext context)
        {
            context.Database.EnsureCreated();

            if (context.PostItem.Any())
            {
                return;
            }

            var postItems = new PostItem[]
            {
                //asp net paneb ID väärtused ise alates 1'st
                new PostItem
                {
                    Time = "16:00", Date = "26.03.2019", Location = "Nohik", GroupId = 4,
                    Heading = "Kohvipaus", Message = "Tule tasuta kohvile!", Type = "Announcement"
                },
                new PostItem
                {
                   Time = "20:00", Date = "26.03.2019", Location = "Vanalinn", GroupId = 3,
                    Heading = "Bar brawl", Message = "Naudime seltskonda ja lõõgastume.", Type = "Event"
                },
                new PostItem
                {
                   Time = "12:00", Date = "28.03.2019", Location = "Aula", GroupId = 1,
                    Heading = "Business ideas to life", Message = "Annual business ideas competition with real investors as judges.", Type = "Event"
                },
                new PostItem
                {
                   Time = "12:00", Date = "31.03.2019", Location = "IT maja", GroupId = 2,
                    Heading = "Külalislektori Muhammed Thali loeng",
                    Message = "Külalislektor Muhammed Thali avab meile blockchaini maailma.", Type = "Event"
                },
                new PostItem
                {
                   Time = "20:00", Date = "30.03.2019", Location = "Nõmme spordikesus", GroupId = 1,
                    Heading = "Tervisejooks", Message = "Oleme tervislikud ja lähme jooksma!", Type = "Event"
                },
                new PostItem
                {
                    Date = "29.03.2019", GroupId = 1,
                    Heading = "Liitu Fotoklubiga!!", Message = "Tule uuri ja vaata, mille huvitavaga me tegeleme @ FotoKlubi",
                    Type = "Announcement"
                },
                new PostItem
                {
                    Date = "29.03.2019", GroupId = 3,
                    Heading = "Tule täna kell 15.00 loengule", Message = "Muti Onu tuleb räägib küberturvalisusest: Be Safe!",
                    Type = "Announcement"
                },
                new PostItem
                {
                    Date = "29.03.2019", GroupId = 4,
                    Heading = "Vajan head konspekti!", Message = "Kui kellelgi on head mata konspekti, siis võiks jagada.",
                    Type = "Announcement"
                }

            };
            foreach (var postItem in postItems)
            {
                context.PostItem.Add(postItem);
            }

            if (context.GroupItem.Any())
            {
                return;
            }

            var groupItems = new GroupItem[]
            {
                new GroupItem
                {
                    Name = "TalTech", Description = "Töötab?", Admin = "Administrator", ParentId = 0
                },
                new GroupItem
                {
                    Name = "Infotehnoloogia teaduskond", Description = "TalTech grupp", Admin = "Administrator", ParentId = 1
                },
                new GroupItem
                {
                    Name = "Äriinfotehnoloogia", Description = "Infotehnoloogia teaduskonna grupp", Admin = "Administrator", ParentId = 2
                },
                new GroupItem
                {
                    Name = "IABB42", Description = "Äriinfotehnoloogia grupp", Admin = "Administrator", ParentId = 3
                }
            };
            foreach (var groupItem in groupItems)
            {
                context.GroupItem.Add(groupItem);
            }

            var members = new Member[]
            {
                new Member
                {
                    Name = "Mari Maasikas", Image = "maasikas.jpg"
                },
                new Member
                {
                Name = "Mari Vaarikas", Image = "vaarikas.jpg"
                },
                new Member
                {
                    Name = "Mari Mustikas", Image = "mustikas.jpg"
                },
                new Member
                {
                    Name = "Mari Murakas", Image = "murakas.jpg"
                },
                new Member
                {
                    Name = "Mari Jõhvikas", Image = "johvikas.jpg"
                }
            };
            foreach (var member in members)
            {
                context.Member.Add(member);
            }

            context.SaveChanges();
        }
    }
}
