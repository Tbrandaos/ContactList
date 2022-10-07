
using System;
using System.Collections.Generic;

namespace ContactList.Infra.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public IList<Contact> Contacts { get; set; }
    }
}
