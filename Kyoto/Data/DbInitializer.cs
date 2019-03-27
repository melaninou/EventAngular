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
                new PostItem
                {
                    ID = 1111, Time = "16:00", Date = "26.03.2019", Location = "Nohik", Group = "IABB43",
                    Heading = "Kohvipaus", Message = "Tule tasuta kohvile!", Type = "Announcement"
                },
                new PostItem
                {
                    ID = 1112, Time = "20:00", Date = "26.03.2019", Location = "Vanalinn", Group = "Äriinfotehnoloogia",
                    Heading = "Bar brawl", Message = "Naudime seltskonda ja lõõgastume.", Type = "Event"
                },
                new PostItem
                {
                    ID = 1113, Time = "12:00", Date = "28.03.2019", Location = "Aula", Group = "Äriinfotehnoloogia",
                    Heading = "Bar brawl", Message = "Naudime seltskonda ja lõõgastume.", Type = "Event"
                },
                new PostItem
                {
                    ID = 1114, Time = "12:00", Date = "31.03.2019", Location = "IT maja", Group = "TalTech",
                    Heading = "Business ideas to life",
                    Message = "Annual business ideas competition with real investors as judges.", Type = "Event"
                },
                new PostItem
                {
                    ID = 1115, Time = "20:00", Date = "30.03.2019", Location = "Nõmme spordikesus", Group = "TalTech",
                    Heading = "Bar brawl", Message = "Oleme tervislikud ja lähme jooksma!", Type = "Event"
                }

            };
            foreach (var postItem in postItems)
            {
                context.PostItem.Add(postItem);
            }

            context.SaveChanges();
        }
    }
}
