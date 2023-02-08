using System.Linq.Expressions;

namespace IMP.Helpers
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
