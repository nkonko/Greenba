using System.Runtime.Serialization;

namespace Domain.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value ="Pendiente")]
        Pending,

        [EnumMember(Value = "Recibido")]
        Received,

        [EnumMember(Value = "Cancelado")]
        Canceled
    }
}
