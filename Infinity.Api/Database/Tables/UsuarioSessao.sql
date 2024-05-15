USE [Infinity]
GO

/****** Object:  Table [dbo].[UsuarioSessao]    Script Date: 3/5/2024 6:30:23 AM ******/
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

ALTER TABLE [dbo].[UsuarioSessao]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioSessao_Usuarios] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuarios] ([Id])
GO

ALTER TABLE [dbo].[UsuarioSessao] CHECK CONSTRAINT [FK_UsuarioSessao_Usuarios]
GO

