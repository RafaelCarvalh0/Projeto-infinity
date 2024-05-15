USE [Infinity]
GO

/****** Object:  Table [dbo].[Cobranca]    Script Date: 3/5/2024 6:29:37 AM ******/
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

ALTER TABLE [dbo].[Cobranca]  WITH CHECK ADD  CONSTRAINT [FK_Cobranca_Usuarios] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuarios] ([Id])
GO

ALTER TABLE [dbo].[Cobranca] CHECK CONSTRAINT [FK_Cobranca_Usuarios]
GO

