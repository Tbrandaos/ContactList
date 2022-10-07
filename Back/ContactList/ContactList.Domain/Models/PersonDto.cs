using System;
using System.Collections.Generic;

namespace ContactList.Domain.Models
{
    public class PersonDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public IList<ContactDto> Contacts { get; set; }
    }
}
