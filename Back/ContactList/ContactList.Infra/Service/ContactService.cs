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
    public class ContactService : IContactService
    {
        private readonly DataContext _context;

        public ContactService(DataContext context)
        {
            _context = context;
        }

        public async Task<ContactDto> Create(ContactDto request)
        {
            try
            {
                var entity = new Contact()
                {
                    Name = request.Name,
                    Value = request.Value,
                    PersonId = request.PersonId
                };

                _context.Contacts.Add(entity);

                await _context.SaveChangesAsync();

                request.Id = entity.Id;
                return request;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ContactDto> Update(ContactDto request)
        {
            try
            {
                var contact = await _context.Contacts.FirstOrDefaultAsync(a => a.Id == request.Id);
                if (contact == null) throw new Exception("Contact not found for Id: " + request.Id);

                contact.Name = request.Name;
                contact.Value = request.Value;

                await _context.SaveChangesAsync();

                request.Id = contact.Id;

                return request;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<ContactDto>> GetAll()
        {
            try
            {
                IQueryable<Contact> query = _context.Contacts.OrderBy(a => a.Id);

                var contacts = await query.ToListAsync();

                var result = new List<ContactDto>();

                foreach (var item in contacts)
                {
                    result.Add(new ContactDto()
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Value = item.Value,
                        PersonId = item.PersonId
                    });
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ContactDto> GetById(int id)
        {
            try
            {
                IQueryable<Contact> query = _context.Contacts
                    .OrderBy(a => a.Id)
                    .Where(a => a.Id == id);

                var contact = await query.FirstOrDefaultAsync();

                if (contact == null)
                    throw new Exception("Contact not found for Id: " + id);

                return new ContactDto()
                {
                    Id = contact.Id,
                    Name = contact.Name,
                    Value = contact.Value,
                    PersonId = contact.PersonId
                };
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
                var contact = await _context.Contacts.FirstOrDefaultAsync(a => a.Id == id);
                if (contact == null) throw new Exception("Contact not found for Id: " + id);

                _context.Contacts.Remove(contact);

                var result = await _context.SaveChangesAsync();
                if (result == 0) throw new Exception("Error on Contact Delete");

                return id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
