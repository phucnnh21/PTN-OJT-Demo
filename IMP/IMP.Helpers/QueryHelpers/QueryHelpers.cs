using IMP.EFCore;
using LinqKit;
using System.Linq.Expressions;
using System.Reflection;

namespace IMP.Helpers
{
    public static class QueryHelpers
    {
        public static IQueryable<T> Search<T>(IQueryable<T> query, GenericQueryDto genericRequest)
        {
            if (genericRequest.SearchColumns is null || string.IsNullOrEmpty(genericRequest.Keyword)) return query;

            genericRequest.SearchColumns = genericRequest.SearchColumns.Select(s => s.ToLowerInvariant()).ToArray();

            ExpressionStarter<T> predicate = PredicateBuilder.New<T>();

            T entity = (T)Activator.CreateInstance(typeof(T));

            foreach (PropertyInfo prop in entity.GetType().GetProperties())
            {
                if (genericRequest.SearchColumns.Any(prop.Name.ToLower().Contains))
                {
                    predicate.Or(x => $"{x.GetType().GetProperties().Single(y => y.Name == prop.Name).GetValue(x, null)}".ToLower().Contains(genericRequest.Keyword.ToLower()));
                }
            }

            return query.Where(predicate);
        }

        public static bool Match<T>(T entity, GenericQueryDto genericRequest)
        {
            if (genericRequest.SearchColumns.Length == 0 || string.IsNullOrEmpty(genericRequest.Keyword)) return true;

            foreach (PropertyInfo prop in entity.GetType().GetProperties())
            {
                if (genericRequest.SearchColumns.Any(prop.Name.ToLower().Contains))
                {
                    if (entity.GetType().GetProperties().Single(y => y.Name == prop.Name).GetValue(entity, null).ToString().ToLower().Contains(genericRequest.Keyword.ToString().ToLower()))
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        public static IQueryable<TSource> OrderBy<TSource>(this IQueryable<TSource> query, OrderByQuery orderBy)
        {
            if (orderBy is null || string.IsNullOrWhiteSpace(orderBy.FieldName) || !IsAMemberOfType<TSource>(orderBy.FieldName))
            {
                return query;
            }

            var lambda = (dynamic)CreateExpression(typeof(TSource), orderBy.FieldName);

            return orderBy.IsAscending
                ? Queryable.OrderBy(query, lambda)
                : Queryable.OrderByDescending(query, lambda);
        }

        private static LambdaExpression CreateExpression(Type type, string propertyName)
        {
            var param = Expression.Parameter(type, "x");

            Expression body = param;
            foreach (var member in propertyName.Split('.'))
            {
                body = Expression.PropertyOrField(body, member);
            }

            return Expression.Lambda(body, param);
        }

        private static bool IsAMemberOfType<T>(string fieldName)
        {
            var fieldNames = typeof(T)
                .GetProperties()
                .Select(prop => prop.Name)
                .ToList();

            foreach (var field in fieldNames)
            {
                if (field.ToLower().Equals(fieldName.ToLower()))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
