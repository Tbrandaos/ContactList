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
    public class PersonServiceTest : IDisposable
    {
        private IPersonService _service;
        protected readonly DataContext _context;
        public PersonServiceTest()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new DataContext(options);

            _context.Database.EnsureCreated();

            var persons = new[]
            {
                new Person { Name="First Name", Address="Street One", BirthDate = Convert.ToDateTime("01/01/2021")},
                new Person { Name="Second Name", Address="Street Two", BirthDate = Convert.ToDateTime("01/01/2021")},
                new Person { Name="Third Name", Address="Street Three", BirthDate = Convert.ToDateTime("01/01/2021")},
            };

            _context.Persons.AddRange(persons);
            _context.SaveChanges();
        }

        #region Get
        [Fact]
        public async Task Get_ListAll()
        {
            _service = new PersonService(_context);

            var persons = await _service.GetAll();

            Xunit.Assert.Equal(3, persons.Count);

            Dispose();
        }

        [Fact]
        public async Task Get_ListById()
        {
            _service = new PersonService(_context);

            var person = await _service.GetById(1);

            Xunit.Assert.NotNull(person);
            Xunit.Assert.Equal("First Name", person.Name);
            Xunit.Assert.Equal("Street One", person.Address);
            Xunit.Assert.Equal(Convert.ToDateTime("01/01/2021"), person.BirthDate);

            Dispose();
        }
        #endregion

        #region Post
        [Fact]
        public async Task Post_SendCorrectPerson()
        {
            _service = new PersonService(_context);

            var person = await _service.Create(new PersonDto()
            {
                Name = "Fourth Name",
                Address = "Street Four",
                BirthDate = Convert.ToDateTime("01/01/2021")
            });

            Xunit.Assert.Equal("Fourth Name", person.Name);
            Xunit.Assert.Equal("Street Four", person.Address);
            Xunit.Assert.Equal(Convert.ToDateTime("01/01/2021"), person.BirthDate);
            Dispose();
        }
        #endregion

        #region Put
        [Fact]
        public async Task Put_NotExistId_ThrowException()
        {
            _service = new PersonService(_context);

            await _service.Invoking(a => _service.Update(
                new PersonDto()
                {
                    Id = 4,
                    Name = "Fourth Name",
                    Address = "Street Four",
                    BirthDate = Convert.ToDateTime("01/01/2021")
                }
            ))
            .Should()
            .ThrowExactlyAsync<Exception>();

            Dispose();
        }

        [Fact]
        public async Task Put_SendCorrectPerson()
        {
            _service = new PersonService(_context);

            var person = await _service.Update(new PersonDto()
            {
                Id = 3,
                Name = "Fifth Name",
                Address = "Street Five",
                BirthDate = Convert.ToDateTime("02/02/2022")
            });

            Xunit.Assert.Equal("Fifth Name", person.Name);
            Xunit.Assert.Equal("Street Five", person.Address);
            Xunit.Assert.Equal(Convert.ToDateTime("02/02/2022"), person.BirthDate);
            Dispose();
        }
        #endregion

        #region Delete

        [Fact]
        public async Task Delete_NotExistId_ThrowException()
        {
            _service = new PersonService(_context);

            await _service.Invoking(a => _service.Delete(4))
                .Should()
                .ThrowExactlyAsync<Exception>();

            Dispose();
        }

        [Fact]
        public async Task Delete_CorrectId()
        {
            _service = new PersonService(_context);

            var personId = await _service.Delete(1);

            Xunit.Assert.Equal(1, personId);

            var persons = await _service.GetAll();

            Xunit.Assert.Equal(2, persons.Count);

            Dispose();
        }
        #endregion

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
        }
    }
}
