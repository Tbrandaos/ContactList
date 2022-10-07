using ContactList.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactList.Domain.Service
{
    public interface IContactService
    {
        Task<ContactDto> Create(ContactDto request);
        Task<ContactDto> Update(ContactDto request);
        Task<int> Delete(int id);
        Task<List<ContactDto>> GetAll();
        Task<ContactDto> GetById(int id);
    }
}
