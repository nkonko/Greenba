using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Core.Entities
{
    public interface IPhotoService
    {
        Task<Photo> SaveToDiskAsync(IFormFile photo);
        void DeleteFromDisk(Photo photo);
    }
}