
using Microsoft.EntityFrameworkCore;
using SingleZone.Core.entities;

using System;
using System.Collections.Generic;

namespace SingleZone.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Users> UsersList{ get; set; }
        public DbSet<PlayList> PlayListList { get; set; }
        public DbSet<Songs> SongsList { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<PlayListSong> PlayListSong { get; set; }



        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
    }
}
