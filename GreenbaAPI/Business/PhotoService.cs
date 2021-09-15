using System;
using System.IO;
using System.Threading.Tasks;
using Business.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Business
{
    public class PhotoService : IPhotoService
    {
        const string PoductPath = "images/products";

        const string ProfilePath = "images/profiles";

        public void DeleteFromDisk(Photo photo)
        {
            if (File.Exists(Path.Combine(PoductPath, photo.FileName)))
            {
                File.Delete(PoductPath + photo.FileName);
            }
        }

        public async Task<Photo> SaveToDiskAsync(IFormFile file)
        {
            if (file.Length <= 0)
            {
                return null;
            }

            var photo = new Photo();

            var fileName = await ProcessPhoto(PoductPath, file);

            photo.FileName = fileName;
            photo.PictureUrl = PoductPath + fileName;

            return photo;
        }

        //public async Task<UserPhoto> SaveUserPhotoAsync(IFormFile file)
        //{
        //    if (file.Length <= 0)
        //    {
        //        return null;
        //    }

        //    var photo = new UserPhoto();

        //    var fileName = await ProcessPhoto(ProfilePath, file);

        //    photo.FileName = fileName;
        //    photo.PictureUrl = ProfilePath + fileName;

        //    return photo;
        //}

        //public void DeleteUserPhoto(UserPhoto photo)
        //{
        //    if (File.Exists(Path.Combine(ProfilePath, photo.FileName)))
        //    {
        //        File.Delete(ProfilePath + photo.FileName);
        //    }
        //}

        private async Task<string> ProcessPhoto(string path, IFormFile file)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

            var filePath = Path.Combine(path, fileName);

            await using var fileStream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(fileStream);

            return fileName;
        }
    }
}
