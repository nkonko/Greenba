FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app
#
# copy csproj and restore as distinct layers
COPY *.sln .
COPY GreenbaAPI/*.csproj ./GreenbaAPI/
COPY Domain/*.csproj ./Domain/
COPY Business/*.csproj ./Business/
COPY Source/*.csproj ./Source/
#
RUN dotnet restore 
#
# copy everything else and build app
COPY GreenbaAPI/. ./GreenbaAPI/
COPY Domain/. ./Domain/
COPY Business/. ./Business/
COPY Source/. ./Source/
ADD GreenbaAPI/images/. ./DockerOutput/Website/images
#
WORKDIR /app/GreenbaAPI
RUN dotnet publish -c release -o out
#
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /DockerOutput/Website
COPY --from=build /app/GreenbaAPI/out ./
ENTRYPOINT ["dotnet", "GreenbaAPI.dll"]