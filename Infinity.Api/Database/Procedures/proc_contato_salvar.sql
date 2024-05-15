USE [Infinity]
GO
/****** Object:  StoredProcedure [dbo].[proc_contato_salvar]    Script Date: 3/24/2024 6:44:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER  PROCEDURE [dbo].[proc_contato_salvar]
	@p_usuario_id INT,
    @p_nome VARCHAR(50),
    @p_celular VARCHAR(11)
AS
BEGIN
	BEGIN TRAN
		BEGIN TRY
			BEGIN
				IF @p_usuario_id IS NULL OR @p_usuario_id = 0
					THROW 99999, 'É Obrigatório informar o id do usuário!', 1;
			END

			BEGIN
				IF @p_celular IS NULL OR @p_celular = ''
					THROW 99999, 'É Obrigatório informar o número do celular!', 1;
			END

			BEGIN 
				IF EXISTS(SELECT 1 FROM Contatos WHERE Celular = @p_celular AND UsuarioId = @p_usuario_id)
					THROW 99999, 'Este número já existe!', 1;
			END		


			BEGIN
				INSERT INTO Contatos (UsuarioId, Nome, Celular, DataInclusao) 
				VALUES (@p_usuario_id, @p_nome, @p_celular, GETDATE())
			END

			END TRY
		BEGIN CATCH

            IF @@TRANCOUNT > 0  
               ROLLBACK TRAN

			DECLARE @ErrorMessage NVARCHAR(4000);
			DECLARE @ErrorSeverity INT;
			DECLARE @ErrorState INT;

			SELECT
				@ErrorMessage = ERROR_MESSAGE(),
				@ErrorSeverity = ERROR_SEVERITY(),
				@ErrorState = ERROR_STATE();

			-- Use RAISERROR inside the CATCH block to return error
			-- information about the original error that caused
			-- execution to jump to the CATCH block.
			RAISERROR (@ErrorMessage, -- Message text.
					   @ErrorSeverity, -- Severity.
					   @ErrorState -- State.
					   );

		END CATCH;

	IF @@TRANCOUNT > 0  
		COMMIT TRAN;
END
