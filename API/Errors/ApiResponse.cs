using System;

namespace API.Errors
{
  public class ApiResponse
  {
    public ApiResponse(int statusCode, string message = null)
    {
      StatusCode = statusCode;
      // null coalescing operator
      // If null execute next line
      Message = message ?? GetDefaultMessageForStatusCode(statusCode);
    }
    public int StatusCode { get; }
    public string Message { get; }

    private string GetDefaultMessageForStatusCode(int statusCode)
    {
      return statusCode switch {
          400 => "A bad request, you have made",
          401 => "Authorized, you are not",
          404 => "Resource found, it was not",
          500 => "Errors are the parth to the dard side. Errors lead to anger. Anger leads to hate. Hate leads to career change.",
          _ => null
      };
    }

  }
}