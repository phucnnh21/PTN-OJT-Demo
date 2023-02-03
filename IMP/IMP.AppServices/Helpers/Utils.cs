using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IMP.AppServices
{
    public static class Utils
    {
        /// <summary>
        /// Concat two lamda expressions
        /// </summary>
        /// <param name="firstExpression"></param>
        /// <param name="secondExpression"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static Expression<Func<T, bool>> ConcatLambdaExpression<T>(Expression<Func<T, bool>> firstExpression, Expression<Func<T, bool>> secondExpression)
        {
            var invokedThird = Expression.Invoke(secondExpression, firstExpression.Parameters.Cast<Expression>());
            var finalExpression = Expression.Lambda<Func<T, bool>>(Expression.AndAlso(firstExpression.Body, invokedThird), firstExpression.Parameters);
            return finalExpression;
        }

    }
}
