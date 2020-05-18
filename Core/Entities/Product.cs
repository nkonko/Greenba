using System.Collections.Generic;

namespace Core.Entities
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

        //To avoid the possibility of uploading an image to another products photo collection 
        //we will make this a readonly list and provide methods in the class to add a new Photo. 
        //Here is the new Product.cs class
        private readonly List<Photo> _photos = new List<Photo>();
        public IReadOnlyList<Photo> Photos => _photos.AsReadOnly();

        public void AddPhoto(string pictureUrl, string fileName, bool isMain = false)
        {
            var photo = new Photo 
            {
                FileName = fileName,
                PictureUrl = pictureUrl
            };

            if (_photos.Count == 0) photo.IsMain = true;

            _photos.Add(photo);
        }
    }
}