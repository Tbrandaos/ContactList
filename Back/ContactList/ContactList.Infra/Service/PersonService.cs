using ContactList.Domain.Models;
using ContactList.Domain.Service;
using ContactList.Infra.Context;
using ContactList.Infra.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactList.Infra.Service
{
    public class PersonService : IPersonService
    {
        private readonly DataContext _context;

        public PersonService(DataContext context)
        {
            _context = context;
        }

        public async Task<PersonDto> Create(PersonDto request)
        {
            try
            {
                var entity = new Person()
                {
                    Name = request.Name,
                    Address = request.Address,
                    BirthDate = request.BirthDate
                };

                if (request.Contacts != null)
                {
                    foreach (var item in request.Contacts)
                    {
                        entity.Contacts.Add(new Contact()
                        {
                            Name = item.Name,
                            Value = item.Value,
                            ContactType = item.ContactType
                        });
                    }
                }

                _context.Persons.Add(entity);

                var result = await _context.SaveChangesAsync();
                if (result == 0) throw new Exception("Error on Person Insert");

                request.Id = entity.Id;
                return request;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                var person = await _context.Persons.FirstOrDefaultAsync(a => a.Id == id);
                if (person == null) throw new Exception("Person not found for Id: " + id);

                _context.Persons.Remove(person);

                await _context.SaveChangesAsync();

                return id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<PersonDto>> GetAll()
        {
            try
            {
                IQueryable<Person> query = _context.Persons
                    .OrderBy(a => a.Id);

                var persons = await query.ToListAsync();

                var result = new List<PersonDto>();

                foreach (var item in persons)
                {
                    var response = new PersonDto()
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Address = item.Address,
                        BirthDate = item.BirthDate
                    };

                    result.Add(response);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PersonDto> GetById(int id)
        {
            try
            {
                IQueryable<Person> query = _context.Persons
                    .Include(a => a.Contacts)
                    .OrderBy(a => a.Id)
                    .Where(a => a.Id == id);

                var person = await query.FirstOrDefaultAsync();

                if (person == null) return new PersonDto();

                var response = new PersonDto()
                {
                    Id = person.Id,
                    Name = person.Name,
                    Address = person.Address,
                    BirthDate = person.BirthDate,
                };

                if (person.Contacts != null)
                {
                    foreach (var item in person.Contacts)
                    {
                        response.Contacts.Add(new ContactDto()
                        {
                            Id = item.Id,
                            Name = item.Name,
                            Value = item.Value,
                            ContactType = item.ContactType,
                            PersonId = item.PersonId
                        });
                    }
                }

                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<PersonDto>> GetByName(string name)
        {
            try
            {
                IQueryable<Person> query = _context.Persons
                    .OrderBy(a => a.Id)
                    .Where(a => a.Name.Contains(name));

                var persons = await query.ToListAsync();

                var result = new List<PersonDto>();

                foreach (var item in persons)
                {
                    result.Add(new PersonDto()
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Address = item.Address,
                        BirthDate = item.BirthDate
                    });
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PersonDto> Update(PersonDto request)
        {
            try
            {
                var person = await _context.Persons
                     .Include(a => a.Contacts)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);
                if (person == null) throw new Exception("Person not found for Id: " + request.Id);

                person.Name = request.Name;
                person.Address = request.Address;
                person.BirthDate = request.BirthDate;

                if (request.Contacts != null)
                {
                    foreach (var item in request.Contacts)
                    {
                        var existContact = person.Contacts.Where(a => a.Id == item.Id).FirstOrDefault();

                        if(existContact != null)
                        {
                            existContact.Name = item.Name;
                            existContact.Value = item.Value;
                            existContact.ContactType = item.ContactType;
                        }
                        else
                        {
                            var contact = new Contact()
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Value = item.Value,
                                ContactType = item.ContactType,
                                PersonId = item.PersonId
                            };

                            person.Contacts.Add(contact);
                        }
                    }
                }

                await _context.SaveChangesAsync();

                request.Id = person.Id;

                return request;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
