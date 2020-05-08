namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        // For EF migrtions
        public Address()
        {
        }

        // this is a value enty so its owned by our order
        // For that case it doens't have a id
        public Address(string firstName, string lastName, string street, string city, string state, string zipcode)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            State = state;
            Zipcode = zipcode;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
    }
}