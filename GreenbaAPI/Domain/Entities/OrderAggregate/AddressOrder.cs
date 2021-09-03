namespace Domain.Entities.OrderAggregate
{
    public class AddressOrder
    {

        public AddressOrder()
        {
        }

        public AddressOrder(string firstName, string lastName, string street, string city, string province, string cp)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            Province = province;
            CP = cp;
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public string Province { get; set; }

        public string CP { get; set; }
    }
}
