using ContactList.Domain.Models;
using ContactList.Domain.Service;
using ContactList.Infra.Context;
using ContactList.Infra.Entities;
using ContactList.Infra.Service;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading.Tasks;
using Xunit;

namespace ContactList.Test
{
    [TestClass]
    public class ContactServiceTest : IDisposable
    {
        private IContactService _service;
        protected readonly DataContext _context;
        public ContactServiceTest()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new DataContext(options);

            _context.Database.EnsureCreated();

            var contacts = new[]
            {
                new Contact { Name="Email", Value = "xxx@gmail.com"},
                new Contact { Name="Whatsapp", Value = "(99) 99999-9999"},
                new Contact { Name="Linkedin", Value = "xxx/Linkedin.com"},
            };

            _context.Contacts.AddRange(contacts);
            _context.SaveChanges();
        }

        #region Get
        [Fact]
        public async Task Get_ListAll()
        {
            _service = new ContactService(_context);

            var contacts = await _service.GetAll();

            Xunit.Assert.Equal(3, contacts.Count);

            Dispose();
        }

        [Fact]
        public async Task Get_ListById()
        {
            _service = new ContactService(_context);

            var contact = await _service.GetById(1);

            Xunit.Assert.NotNull(contact);
            Xunit.Assert.Equal("Email", contact.Name);
            Xunit.Assert.Equal("xxx@gmail.com", contact.Value);

            Dispose();
        }

        [Fact]
        public async Task Get_ListByNotExistId_ThrowException()
        {
            _service = new ContactService(_context);

            await _service.Invoking(a => _service.GetById(4))
                .Should()
                .ThrowExactlyAsync<Exception>();

            Dispose();
        }
        #endregion

        #region Post
        [Fact]
        public async Task Post_SendCorrectContact()
        {
            _service = new ContactService(_context);

            var contact = await _service.Create(new ContactDto()
            {
                Name = "Phone",
                Value = "2222-2222",
            });

            Xunit.Assert.Equal("Phone", contact.Name);
            Xunit.Assert.Equal("2222-2222", contact.Value);

            Dispose();
        }
        #endregion

        #region Put
        [Fact]
        public async Task Put_NotExistId_ThrowException()
        {
            _service = new ContactService(_context);

            await _service.Invoking(a => _service.Update(
                new ContactDto()
                {
                    Id = 4,
                    Name = "Phone",
                    Value = "2222-2222",
                }
            ))
            .Should()
            .ThrowExactlyAsync<Exception>();

            Dispose();
        }

        [Fact]
        public async Task Put_SendCorrectContact()
        {
            _service = new ContactService(_context);

            var contact = await _service.Update(new ContactDto()
            {
                Id = 3,
                Name = "Linkedin Update",
                Value = "xxxyyy/Linkedin.com",
            });

            Xunit.Assert.Equal("Linkedin Update", contact.Name);
            Xunit.Assert.Equal("xxxyyy/Linkedin.com", contact.Value);

            Dispose();
        }
        #endregion

        #region Delete

        [Fact]
        public async Task Delete_NotExistId_ThrowException()
        {
            _service = new ContactService(_context);

            await _service.Invoking(a => _service.Delete(4))
                .Should()
                .ThrowExactlyAsync<Exception>();

            Dispose();
        }

        [Fact]
        public async Task Delete_CorrectId()
        {
            _service = new ContactService(_context);

            var contactId = await _service.Delete(1);

            Xunit.Assert.Equal(1, contactId);

            var contacts = await _service.GetAll();

            Xunit.Assert.Equal(2, contacts.Count);

            Dispose();
        }
        #endregion

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
        }
    }
}
