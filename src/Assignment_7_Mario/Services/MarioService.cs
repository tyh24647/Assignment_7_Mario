using System;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Practices.TransientFaultHandling;
using System.IO;


namespace Assignment_7_Mario.Services {

    /*
    * This class allows for web requests to be made to the mario server.
    */
    public class MarioService : IMarioService {

        private RetryPolicy retryPolicy = new RetryPolicy(new DetectionStrategy(), 10);

        private string serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";
        

        private const int SERVICE_UNAVAILABLE = 503;
        

        public async Task<string> GetAction(string marioAction) {
            var request = WebRequest.Create(serverURL + '/' + marioAction);
            string responseStr = null;
            
            try {
                responseStr = await retryPolicy.ExecuteAsync(async () => {
                    var response = await request.GetResponseAsync();
                    var reader = new StreamReader(response.GetResponseStream());
                    return await reader.ReadToEndAsync();
                });
            } catch (Exception e) {
                
                var exception = e as WebException;
                var statusCode = (int)exception.Status;

                if (statusCode == SERVICE_UNAVAILABLE) {
                    return "503";
                }

                return "ERROR";
            }
            
            return responseStr;
        }
    }
}
