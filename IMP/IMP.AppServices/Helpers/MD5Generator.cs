using System.Security.Cryptography;
using System.Text;

namespace IMP.AppServices
{
    public static class MD5Generator
    {
        public static string Generate(string input)
        {
            // To calculate MD5 hash from an input string
            MD5 md5 = System.Security.Cryptography.MD5.Create();

            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);

            byte[] hash = md5.ComputeHash(inputBytes);

            // convert byte array to hex string
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                //to make hex string use lower case instead of uppercase add parameter “X2”
                sb.Append(hash[i].ToString("x2"));
            }

            var str = sb.ToString();

            return sb.ToString();
        }
    }
}
