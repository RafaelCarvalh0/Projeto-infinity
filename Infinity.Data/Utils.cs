using System;
using System.Collections.Generic;
using System.Text;

namespace Rabrune.Data
{
    public class Utils
    {
        public static int IntParse(object column)
        {
            var valor = Convert.ToInt32(column);

            return valor;
        }

        public static int? IntTryParse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var valor = Convert.ToInt32(column);

            return valor;
        }

        public static long LongParse(object column)
        {
            var valor = Convert.ToInt64(column);

            return valor;
        }

        public static long? LongTryParse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var valor = Convert.ToInt64(column);

            return valor;
        }

        public static char CharParse(object column)
        {
            var valor = Convert.ToChar(column);

            return valor;
        }

        public static char? CharTryParse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var valor = Convert.ToChar(column);

            return valor;
        }

        public static string StringTryParse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var valor = column.ToString();

            return valor;
        }

        public static decimal DecimalParse(object column, bool decimalRound = false)
        {
            var valor = Convert.ToDecimal(column);
            
            if (decimalRound)
            {
                valor = Math.Round(valor, 2);
            }

            return valor;
        }

        public static decimal? DecimalTryParse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var valor = Convert.ToDecimal(column);

            return valor;
        }

        public static DateTime DateTimeParse(object column)
        {
            var valor = Convert.ToDateTime(column);

            return valor;
        }

        public static DateTime? DateTimeTryParse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var valor = Convert.ToDateTime(column);

            return valor;
        }

        public static byte[] BytesParse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var valor = System.Text.Encoding.UTF8.GetBytes(column.ToString());

            return valor;
        }

        public static object BytesParse(byte[] content)
        {
            if (content == null)
            {
                return DBNull.Value;
            }

            var valor = Convert.ToBase64String(content);

            return valor;
        }

        public static string BytesBase64Parse(object column)
        {
            if (column == DBNull.Value)
            {
                return null;
            }

            var bytes = System.Text.Encoding.UTF8.GetBytes(column.ToString());
            var valor = Convert.ToBase64String(bytes);

            return valor;
        }

        public static object DBNullParse(object parametro)
        {
            if (parametro == null)
            {
                return DBNull.Value;
            }

            return parametro;
        }

        public static double DoubleParse(object column)
        {
            var valor = Convert.ToDouble(column);

            return valor;
        }

        public static double DoubleTryParse(object column)
        {
            if (column == DBNull.Value)
            {
                return 0;
            }

            var valor = Convert.ToDouble(column);

            return valor;
        }
    }
}
