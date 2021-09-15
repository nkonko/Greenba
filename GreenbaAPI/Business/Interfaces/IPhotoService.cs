using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Business.Interfaces
{
    public interface IPhotoService
    {
        Task<Photo> SaveToDiskAsync(IFormFile photo);

        void DeleteFromDisk(Photo photo);

        //Task<UserPhoto> SaveUserPhotoAsync(IFormFile photo);
    }
}
