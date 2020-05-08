namespace Core.Entities.OrderAggregate
{
    // This acts like a snapshot at the time it was placed
    // It's not getting an ID, because its owned by the order itself.
    // because the name or picture could be changed.
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }

        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}