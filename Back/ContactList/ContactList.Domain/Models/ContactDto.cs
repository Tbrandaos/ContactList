
using ContactList.Domain.Enums;

namespace ContactList.Domain.Models
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public ContactType ContactType { get; set; }
        public int PersonId { get; set; }
    }
}
