using System.Net.Http.Json;

namespace IMP.Helpers
{
    public static class HttpClientHelpers
    {
        public static async Task PostAsync<T>(string url, T bodyObject)
        {
            using var httpClient = new HttpClient();

            HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, bodyObject);

            return;
        }
    }
}
