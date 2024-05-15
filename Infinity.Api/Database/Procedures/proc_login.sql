USE [Infinity]
GO
/****** Object:  StoredProcedure [dbo].[proc_login]    Script Date: 3/24/2024 6:46:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--select * from Usuarios
--select * from Contatos
--exec [dbo].[proc_login]
--	@p_email  = 'rafaelhenriquecarvalho@outlook.com',
--	@p_senha = '123456'

--Consulta se o usuário existe na tabela
CREATE OR ALTER PROCEDURE [dbo].[proc_login]
    @p_email NVARCHAR(50),
    @p_senha NVARCHAR(50)
AS
BEGIN
    BEGIN
        IF @p_email IS NULL OR LTRIM(RTRIM(@p_email)) = ''
            THROW 99999, 'O parâmetro @p_email é obrigatório!', 1;
    END

    BEGIN
        IF @p_senha IS NULL OR LTRIM(RTRIM(@p_senha)) = ''
            THROW 99999, 'O parâmetro @p_senha é obrigatório!', 1;
    END

    DECLARE @hashed_password VARBINARY(256) = HASHBYTES('SHA2_256', @p_senha);

    -- Verifica se o usuário e a senha estão corretos
    IF EXISTS (SELECT 1 FROM Usuarios WHERE Email = @p_email AND Senha = @hashed_password)
    BEGIN
        -- Se o usuário e a senha estiverem corretos, retorna o ID do usuário
        SELECT Id, ClientId FROM Usuarios WHERE Email = @p_email;
    END
    ELSE
    BEGIN
        -- Se o usuário ou a senha estiverem incorretos, retorna NULL
        SELECT 
		NULL AS Id,
		NULL AS ClientId
		;
    END
END

--select * from Usuarios

--DECLARE @senha NVARCHAR(50) = '123456';
--DECLARE @hashed_password VARBINARY(256) = HASHBYTES('SHA2_256', @senha);

--insert into Usuarios (Nome, Email, Senha, ClientId, Celular, DataCriacao, Autenticado) VALUES 
--('Rafael', 'rafaelhenriquecarvalho@outlook.com', @hashed_password, 'infinity', '16993792295', GETDATE(), 0) 

--update Usuarios set Senha = @hashed_password where Id = 5

--select * from Usuarios
--delete from Usuarios 