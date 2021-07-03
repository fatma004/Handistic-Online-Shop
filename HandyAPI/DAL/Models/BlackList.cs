﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class BlackList
    {

        public int Id { get; set; }

        [ForeignKey("User")]
        public string SellerId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Governorate { get; set; }
        [Required]
        public string IdCardImage { get; set; }
        [Required]
        public string PersonWithCardImage { get; set; }
        public string Link { get; set; }
        public int BlocksNumber { get; set; }
        public string ProductWithCardImage { get; set; }
        public virtual AppUser User { get; set; }
    }
}
