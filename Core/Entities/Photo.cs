namespace Core.Entities
{

    //We are going to “fully define” the relationship between the Photo and the Product here – this will mean that when a product is deleted,
    // then this will cascade down to the Photo as well and also delete this.
    public class Photo : BaseEntity
    {
        public string PictureUrl { get; set; }
        public string FileName { get; set; }
        public bool IsMain { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set;}
        
    }
}