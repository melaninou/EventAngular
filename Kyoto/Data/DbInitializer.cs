using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kyoto.Models;
using Kyoto.Models.User_Registration;

namespace Kyoto.Data
{
    public static class DbInitializer
    {
        public static void Initialize(KyotoContext kyotoContext, AuthenticationContext authContext)
        {
            kyotoContext.Database.EnsureCreated();
            authContext.Database.EnsureCreated();

            if (kyotoContext.PostItem.Any())
            {
                return;
            }
            // Response Status 
            var postItems = new PostItem[]
            {
                //asp net paneb ID väärtused ise alates 1'st
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Nohik", GroupId = 4,
                    Heading = "Kohvipaus", Message = "Tule tasuta kohvile!", Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Vanalinn", GroupId = 3,
                    Heading = "Bar brawl", Message = "Naudime seltskonda ja lõõgastume.", Type = "Event", ResponseStatus = ResponseStatus.Going, HasResponse = true
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Aula", GroupId = 1,
                    Heading = "Business ideas to life", Message = "Annual business ideas competition with real investors as judges.",
                    Type = "Event", ResponseStatus = ResponseStatus.Going, HasResponse = true
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "IT maja", GroupId = 2,
                    Heading = "Külalislektori Muhammed Thali loeng",
                    Message = "Külalislektor Muhammed Thali avab meile blockchaini maailma.", Type = "Event",
                    ResponseStatus = ResponseStatus.Maybe, HasResponse = true
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Nõmme spordikesus", GroupId = 1,
                    Heading = "Tervisejooks", Message = "Oleme tervislikud ja lähme jooksma!", Type = "Event",
                    ResponseStatus = ResponseStatus.None, HasResponse = false
                },
                new PostItem
                {
                    Date = DateTime.Now, GroupId = 1,
                    Heading = "Liitu Fotoklubiga!!", Message = "Tule uuri ja vaata, mille huvitavaga me tegeleme @ FotoKlubi",
                    Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false

                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), GroupId = 3,
                    Heading = "Tule täna kell 15.00 loengule", Message = "Muti Onu tuleb räägib küberturvalisusest: Be Safe!",
                    Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), GroupId = 4,
                    Heading = "Vajan head konspekti!", Message = "Kui kellelgi on head mata konspekti, siis võiks jagada.",
                    Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false
                }

            };
            foreach (var postItem in postItems)
            {
                kyotoContext.PostItem.Add(postItem);
            }

            if (kyotoContext.GroupItem.Any())
            {
                return;
            }

            var groupItems = new GroupItem[]
            {
                new GroupItem
                {
                    Name = "TalTech", Description = "Töötab?", Admin = "Administrator", ParentId = 0, Image = "image1.jpg"
                },
                new GroupItem
                {
                    Name = "Infotehnoloogia teaduskond", Description = "TalTech grupp", Admin = "Administrator", ParentId = 1, Image = "image2.jpg"
                },
                new GroupItem
                {
                    Name = "Äriinfotehnoloogia", Description = "Infotehnoloogia teaduskonna grupp", Admin = "Administrator", ParentId = 2, Image = "image3.jpg"
                },
                new GroupItem
                {
                    Name = "IABB42", Description = "Äriinfotehnoloogia grupp", Admin = "Administrator", ParentId = 3, Image = "image4.jpg"
                },
                new GroupItem
                {
                    Name = "Majandusteaduskond", Description = "TalTech group", Admin = "Administrator", ParentId = 1, Image = "image5.jpg"
                },
                new GroupItem
                {
                    Name = "Tartu Ülikool", Description = "TÜ", Admin = "Administrator", ParentId = 0, Image = "image6.jpg"
                },
                new GroupItem
                {
                    Name = "Arstiteaduskond", Description = "TÜ grupp", Admin = "Administrator", ParentId = 6, Image = "image7.jpg"
                }
            };
            foreach (var groupItem in groupItems)
            {
                kyotoContext.GroupItem.Add(groupItem);
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
                kyotoContext.Member.Add(member);
            }

            kyotoContext.SaveChanges();

            if (authContext.ApplicationUsers.Any())
            {
                return;
            }

            var applicationUsers = new ApplicationUser[]
            {
                new ApplicationUser
                {
                    Id = "43ae139a-5698-48a9-a212-9661b1b7de32",
                    UserName = "anujanu",
                    NormalizedUserName = "ANUJANU",
                    FirstName = "Anu",
                    LastName = "Janu",
                    Email = "anujanu@test.ee",
                    NormalizedEmail = "ANUJANU@TEST.EE",
                    PasswordHash = "AQAAAAEAACcQAAAAECV1XK3qTH6f1OwCSNwlRJ8tbH3o4wzsoeOmhsjCPvPBU3rCr7yS8Kx6uGBS//F4iQ==",
                    SecurityStamp = "NYSYYHUDND6XQ3N6YPHGY4RVXASKW7NJ",
                    ConcurrencyStamp = "8b40cb43-9d19-48c0-8740-d67172c05573"
                },
                new ApplicationUser
                {
                    Id = "8b5943d8-d373-43a5-8f41-21a9ed7af683",
                    UserName = "annaallikas",
                    NormalizedUserName = "ANNAALLIKAS",
                    FirstName = "Anna",
                    LastName = "Allikas",
                    Email = "annaallikas@test.ee",
                    NormalizedEmail = "ANNAALLIKAS@TEST.EE",
                    PasswordHash = "AQAAAAEAACcQAAAAEAOQEr/wGATlvISAerYQ7X8UG8bvmQpZVwai6KEbpGYF98WIIsVafHgkpvQEc7vwEQ==",
                    SecurityStamp = "P6DRFCEBNRPGT6WGUJ76XUTLYWETBD6I",
                    ConcurrencyStamp = "a20093bc-3a74-4400-8929-7493db1c7e97"
                }
            };
            foreach (var user in applicationUsers)
            {
                authContext.ApplicationUsers.Add(user);
            }

            authContext.SaveChanges();
        }
    }
}
