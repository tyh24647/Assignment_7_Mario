using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Assignment_7_Mario.Services;
using Microsoft.Practices.TransientFaultHandling;
using System.IO;
using Microsoft.AspNet.Mvc;


namespace Assignment_7_Mario.Services {

    /*
    * This class allows for requests to be made to the mario server./
    */
    public class MarioService : IMarioService {

        private RetryPolicy retryPolicy = new RetryPolicy(new DetectionStrategy(), 10);

        private string serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";


        public async Task<string> GenerateWebRequest(string marioAction) {
            var request = WebRequest.Create(serverURL);
            string responseStr = null;

            try {
                responseStr = await retryPolicy.ExecuteAsync(async () => {
                    var response = await request.GetResponseAsync();
                    var reader = new StreamReader(response.GetResponseStream());
                    return await reader.ReadToEndAsync();
                });
            } catch (Exception) {
                return "ERROR: Could not read external service";
            }

            return responseStr;
        }
    }
}
