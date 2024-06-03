import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export class Helpers {

    public static CellPhoneMaskEditing = (e) => {

        const value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        //value = value.slice(0, 11); // Limita o comprimento máximo do valor para 11 caracteres

        if (value.length === 0)
            e.target.value = "";

        else if (value.length <= 2)
            e.target.value = `(${value}`;

        else if (value.length <= 7)
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;

        else if (value.length <= 11)
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;

        else
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;

        return value;
    };

    public static CellPhoneMaskShowing = (field: string) => {

        let phoneMasked = '';

        if (field.length === 11) {
            phoneMasked = `(${field.slice(0, 2)}) ${field.slice(2, 7)}-${field.slice(7, 11)}`
            return phoneMasked;
        }
        else if (field.length < 11) {
            phoneMasked = `(${field.slice(0, 2)}) ${field.slice(2)}`
            return phoneMasked;
        }

        return field;
    }

    public static DateFormatShowing = (field: Date | string) => {

        let localDate = '';

        if (field !== null) {
            localDate = format(new Date(field), 'dd/MM/yyyy', { locale: ptBR })
        }

        return localDate;
    }

    public static ExceptionMessage = (message: string) => {

        const CleanMessage = message.match(/^[^!]*!/)[0];
        return CleanMessage;

    }

}


