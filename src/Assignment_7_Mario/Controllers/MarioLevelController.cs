using System;
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

        public IMarioService marioService;

        private const string EXTERNAL_SERVICE_ERROR = "ERROR: Could not read " + "external service";
        

        public MarioLevelController(IMarioService marioService) {
            this.marioService = marioService;
        }


        [HttpGet]
        public async Task<string> Get([FromQuery]string marioAction) {
            var responseStr = marioService.GenerateWebRequest(marioAction);
            
            if (responseStr.ToString() == EXTERNAL_SERVICE_ERROR) {
                Response.StatusCode = (int)HttpStatusCode.ServiceUnavailable;
                return EXTERNAL_SERVICE_ERROR;
            }

            return await responseStr;
        }
    }
}

