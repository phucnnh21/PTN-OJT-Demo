#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["IMP.AppHubs/IMP.AppHubs.csproj", "IMP.AppHubs/"]
COPY ["IMP.EFCore/IMP.EFCore.csproj", "IMP.EFCore/"]
RUN dotnet restore "IMP.AppHubs/IMP.AppHubs.csproj"
COPY . .
WORKDIR "/src/IMP.AppHubs"
RUN dotnet build "IMP.AppHubs.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IMP.AppHubs.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IMP.AppHubs.dll"]