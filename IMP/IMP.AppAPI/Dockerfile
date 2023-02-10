#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["IMP.AppAPI/IMP.AppAPI.csproj", "IMP.AppAPI/"]
COPY ["IMP.AppServices/IMP.AppServices.csproj", "IMP.AppServices/"]
COPY ["IMP.EFCore/IMP.EFCore.csproj", "IMP.EFCore/"]
COPY ["IMP.Helpers/IMP.Helpers.csproj", "IMP.Helpers/"]
COPY ["IMP.Infrastructure/IMP.Infrastructure.csproj", "IMP.Infrastructure/"]
RUN dotnet restore "IMP.AppAPI/IMP.AppAPI.csproj"
COPY . .
WORKDIR "/src/IMP.AppAPI"
RUN dotnet build "IMP.AppAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IMP.AppAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IMP.AppAPI.dll"]