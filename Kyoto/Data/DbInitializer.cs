using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kyoto.Models;
using Kyoto.Models.User_Registration;
using Microsoft.AspNetCore.Identity;

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
            var creatorUser = new User
            {
                Id = 1,
                UserName = "anujanu",
                FirstName = "Anu",
                LastName = "Janu",
                Email = "anujanu@test.ee"
            };
            // Response Status 
            var postItems = new PostItem[]
            {
                //asp net paneb ID väärtused ise alates 1'st
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Nohik", GroupId = 4,
                    Heading = "Kohvipaus", Message = "Tule tasuta kohvile!", Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Vanalinn", GroupId = 3,
                    Heading = "Bar brawl", Message = "Naudime seltskonda ja lõõgastume.", Type = "Event", ResponseStatus = ResponseStatus.Going, HasResponse = true,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName

                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Aula", GroupId = 1,
                    Heading = "Business ideas to life", Message = "Annual business ideas competition with real investors as judges.",
                    Type = "Event", ResponseStatus = ResponseStatus.Going, HasResponse = true,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "IT maja", GroupId = 2,
                    Heading = "Külalislektori Muhammed Thali loeng",
                    Message = "Külalislektor Muhammed Thali avab meile blockchaini maailma.", Type = "Event",
                    ResponseStatus = ResponseStatus.Maybe, HasResponse = true,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), Location = "Nõmme spordikesus", GroupId = 1,
                    Heading = "Tervisejooks", Message = "Oleme tervislikud ja lähme jooksma!", Type = "Event",
                    ResponseStatus = ResponseStatus.None, HasResponse = false,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName
                },
                new PostItem
                {
                    Date = DateTime.Now, GroupId = 1,
                    Heading = "Liitu Fotoklubiga!!", Message = "Tule uuri ja vaata, mille huvitavaga me tegeleme @ FotoKlubi",
                    Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), GroupId = 3,
                    Heading = "Tule täna kell 15.00 loengule", Message = "Muti Onu tuleb räägib küberturvalisusest: Be Safe!",
                    Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName
                },
                new PostItem
                {
                    Date = DateTime.Today.AddHours(12), GroupId = 4,
                    Heading = "Vajan head konspekti!", Message = "Kui kellelgi on head mata konspekti, siis võiks jagada.",
                    Type = "Announcement", ResponseStatus = ResponseStatus.None, HasResponse = false,
                    OnDashboard = true,
                    CreatorId = creatorUser.Id,
                    CreatorEmail = creatorUser.Email,
                    CreatorFirstName = creatorUser.FirstName,
                    CreatorLastName = creatorUser.LastName,
                    CreatorUsername = creatorUser.UserName
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

        }
    }
}
