USE [Infinity]
GO
/****** Object:  StoredProcedure [dbo].[proc_contato_excluir]    Script Date: 3/24/2024 6:44:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER  PROCEDURE [dbo].[proc_contato_excluir]
	@p_usuario_id INT,
    @p_contato_id INT
AS
BEGIN
	BEGIN TRAN
		BEGIN TRY
			BEGIN
				IF @p_usuario_id IS NULL OR @p_usuario_id = 0
					THROW 99999, 'É Obrigatório informar o id do usuário!', 1;
			END

			BEGIN
				IF @p_contato_id IS NULL OR @p_contato_id = ''
					THROW 99999, 'É Obrigatório informar o id do contato!', 1;
			END

			BEGIN 
				DELETE FROM Contatos Where UsuarioId = @p_usuario_id AND Id = @p_contato_id
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
