using System.Collections.Generic;
using System.Linq;
using Domain.Entities;

namespace Domain
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public ProductType ProductType { get; set; }

        public int ProductTypeId { get; set; }

        public ProductBrand ProductBrand { get; set; }

        public int ProductBrandId { get; set; }

        public IReadOnlyList<Photo> Photos => photos.AsReadOnly();

        private readonly List<Photo> photos = new List<Photo>();

        public void AddPhoto(string pictureUrl, string fileName, bool isMain = false)
        {
            var photo = new Photo
            {
                FileName = fileName,
                PictureUrl = pictureUrl
            };

            if (photos.Count == 0)
            {
                photo.IsMain = true;
            }

            photos.Add(photo);
        }

        public void RemovePhoto(int id)
        {
            var photo = photos.Find(x => x.Id == id);
            photos.Remove(photo);
        }

        public void SetMainPhoto(int id)
        {
            var currentMain = photos.SingleOrDefault(item => item.IsMain);

            foreach (var item in photos.Where(item => item.IsMain))
            {
                item.IsMain = false;
            }

            var photo = photos.Find(x => x.Id == id);

            if (photo != null)
            {
                photo.IsMain = true;

                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                }
            }
        }
    }
}
