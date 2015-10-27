﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Practices.TransientFaultHandling;
using Assignment_7_Mario.Services;
using System.Net;
using System.IO;

namespace Assignment_7_Mario.Controllers {

    /*
    * This class is the main controller for the mario game
    */
    [Route("api/[controller]")]
    public class MarioLevelController : Controller {

        private static IMarioService marioService;

        string serverURL = "http://webprogrammingassignment7.azurewebsites.net/mario";
        
        private RetryPolicy retryPolicy = new RetryPolicy(new DetectionStrategy(), 10);


        public async Task<string> Get(string rStr) {
            
        }


        /*
        // TODO: DO NOT PUT THIS IN THE CONTROLLER
        // depend on an injection to get the string
        public async Task<string> Get(int id) {
            var request = WebRequest.Create(serverURL);
            string responseStr = null;

            try {
                responseStr = await retryPolicy.ExecuteAsync(async () => {
                    var response = await request.GetResponseAsync();
                    var reader = new StreamReader(response.GetResponseStream());
                    return await reader.ReadToEndAsync();
                });
            } catch (Exception) {
                Response.StatusCode = (int)HttpStatusCode.ServiceUnavailable;
                return "ERROR: Could not read external service";
            }

            return responseStr;
        }
        */


        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value) {
            //
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value) {
            //
        }


        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
            //
        }
    }
}






/* PROBABLY UNNECESSARY...
// GET: api/values
[HttpGet]
public IEnumerable<string> Get() {
    // TODO: figure out what to return when called

    return null;
    //return new string[] { "value1", "value2" };
}
*/