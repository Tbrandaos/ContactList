using ContactList.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactList.Domain.Service
{
    public interface IPersonService
    {
        Task<PersonDto> Create(PersonDto request);
        Task<PersonDto> Update(PersonDto request);
        Task<int> Delete(int id);
        Task<List<PersonDto>> GetAll();
        Task<PersonDto> GetById(int id);
        Task<List<PersonDto>> GetByName(string name);
    }
}
