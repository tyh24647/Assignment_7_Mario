using System;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Practices.TransientFaultHandling;
using System.IO;


namespace Assignment_7_Mario.Services {

    /*
    * This class allows for requests to be made to the mario server.
    */
    public class MarioService : IMarioService {

        private RetryPolicy retryPolicy = new RetryPolicy(new DetectionStrategy(), 10);
        
        private string serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";
        

        public async Task<string> GetAction(string marioAction) {
            var request = WebRequest.Create(serverURL + '/' + marioAction);
            string responseStr = null;

            try {
                responseStr = await retryPolicy.ExecuteAsync(async () => {
                    var response = await request.GetResponseAsync();
                    var reader = new StreamReader(response.GetResponseStream());
                    return await reader.ReadToEndAsync();
                });
            } catch (Exception) {
                return "ERROR";
            }
            
            return responseStr;
        }
    }
}
