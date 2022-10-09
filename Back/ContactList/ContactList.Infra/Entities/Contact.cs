
using ContactList.Domain.Enums;

namespace ContactList.Infra.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public ContactType ContactType { get; set; }
        public Person Person { get; set; }
        public int PersonId { get; set; }
    }
}
