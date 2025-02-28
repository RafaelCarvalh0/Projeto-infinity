USE [master]
GO
/****** Object:  Database [Infinity]    Script Date: 3/5/2024 6:27:29 AM ******/
CREATE DATABASE [Infinity]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Infinity', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Infinity.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Infinity_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Infinity_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Infinity] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Infinity].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Infinity] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Infinity] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Infinity] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Infinity] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Infinity] SET ARITHABORT OFF 
GO
ALTER DATABASE [Infinity] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Infinity] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Infinity] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Infinity] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Infinity] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Infinity] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Infinity] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Infinity] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Infinity] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Infinity] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Infinity] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Infinity] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Infinity] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Infinity] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Infinity] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Infinity] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Infinity] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Infinity] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Infinity] SET  MULTI_USER 
GO
ALTER DATABASE [Infinity] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Infinity] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Infinity] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Infinity] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Infinity] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Infinity] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Infinity] SET QUERY_STORE = ON
GO
ALTER DATABASE [Infinity] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Infinity]
GO
/****** Object:  Table [dbo].[Cobranca]    Script Date: 3/5/2024 6:27:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cobranca](
	[Id] [int] NOT NULL,
	[UsuarioId] [int] NULL,
	[DataVencimento] [datetime] NULL,
	[Status] [varchar](20) NULL,
 CONSTRAINT [PK_Cobranca] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contatos]    Script Date: 3/5/2024 6:27:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contatos](
	[Id] [int] NOT NULL,
	[UsuarioId] [int] NOT NULL,
	[Nome] [varchar](100) NULL,
	[Numero] [int] NOT NULL,
	[DataInclusao] [datetime] NOT NULL,
 CONSTRAINT [PK_Contatos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 3/5/2024 6:27:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [nvarchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Senha] [varbinary](max) NOT NULL,
	[ClientId] [varchar](50) NOT NULL,
	[Celular] [varchar](15) NOT NULL,
	[Autenticado] [int] NULL,
	[DataCriacao] [datetime] NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuarioSessao]    Script Date: 3/5/2024 6:27:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioSessao](
	[Id] [int] NOT NULL,
	[UsuarioId] [int] NOT NULL,
	[UsuarioLogado] [char](1) NOT NULL,
	[DataLoginInicio] [datetime] NULL,
	[DataLoginFim] [datetime] NULL,
 CONSTRAINT [PK_UsuarioSessao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cobranca]  WITH CHECK ADD  CONSTRAINT [FK_Cobranca_Usuarios] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[Cobranca] CHECK CONSTRAINT [FK_Cobranca_Usuarios]
GO
ALTER TABLE [dbo].[Contatos]  WITH CHECK ADD  CONSTRAINT [FK_Contatos_Usuarios] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[Contatos] CHECK CONSTRAINT [FK_Contatos_Usuarios]
GO
ALTER TABLE [dbo].[UsuarioSessao]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioSessao_Usuarios] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[UsuarioSessao] CHECK CONSTRAINT [FK_UsuarioSessao_Usuarios]
GO
/****** Object:  StoredProcedure [dbo].[proc_login]    Script Date: 3/5/2024 6:27:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Consulta se o usuário existe na tabela
CREATE   PROCEDURE [dbo].[proc_login]
	@p_email character varying(50),
	@p_senha character varying(50)
AS
BEGIN
	BEGIN
		IF @p_email IS NULL OR trim(@p_email) = ''
			THROW 99999, 'O parâmetro @p_email é obrigatório!', 1;
	END

	BEGIN
		IF @p_senha IS NULL OR trim(@p_senha) = ''
			THROW 99999, 'O parâmetro @p_password é obrigatório!', 1;
	END

	DECLARE @hashed_password VARBINARY(256) = HASHBYTES('SHA2_256', @p_senha)

	BEGIN

		SELECT 
		u.Id 
		FROM Usuarios u 
		INNER JOIN UsuarioSessao us ON u.Id = us.UsuarioId		 
		ORDER BY u.Id DESC

		UPDATE 
		UsuarioSessao 
		SET UsuarioLogado = 'S', DataLoginInicio = GETDATE(), DataLoginFim = NULL
		WHERE (UsuarioId = (select Id from Usuarios)) 

	END
END
GO
/****** Object:  StoredProcedure [dbo].[proc_logout]    Script Date: 3/5/2024 6:27:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     PROCEDURE [dbo].[proc_logout]
	@p_usuario_id integer,
	@p_usuario_logado CHAR(1) = 'N'
AS
BEGIN
	BEGIN
		IF @p_usuario_id IS NULL OR @p_usuario_id = 0
			THROW 99999, 'O parâmetro @p_usuario_id é obrigatório!', 1;
	END

	BEGIN	
		UPDATE UsuarioSessao
		SET DataLoginInicio = GETDATE(), UsuarioLogado = @p_usuario_logado
		WHERE UsuarioId = @p_usuario_id AND UsuarioLogado = 'S';
	END
END
GO
USE [master]
GO
ALTER DATABASE [Infinity] SET  READ_WRITE 
GO
