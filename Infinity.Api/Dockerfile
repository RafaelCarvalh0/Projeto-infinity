# /Infinity.Api/Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 4000

# Adicione esta linha para definir a variável de ambiente
ENV DOTNET_RUNNING_IN_CONTAINER=true

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Infinity.Api/Infinity.Api.csproj", "Infinity.Api/"]
COPY ["Infinity.Data/Infinity.Data.csproj", "Infinity.Data/"]
COPY ["Infinity.Entities/Infinity.Entities.csproj", "Infinity.Entities/"]
RUN dotnet restore "Infinity.Api/Infinity.Api.csproj"
COPY . .
WORKDIR "/src/Infinity.Api"
RUN dotnet build "Infinity.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Infinity.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Infinity.Api.dll"]
