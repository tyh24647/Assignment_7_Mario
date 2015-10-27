using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Assignment_7_Mario.Services;

namespace Assignment_7_Mario.Services {

    /*
    * This class allows for requests to be made to the mario server./
    */
    public class MarioService : IMarioService {

        private const string WALK = "walk", JUMP = "jump", WAIT = "wait", RUN = "run";


        public WebRequest InitWebRequestFromInputStr(string rStr) {
            if (!ValidRequestStr(rStr)) {
                return null;
            } else if (rStr == WALK) {
                // TODO: Fill these in
            } else if (rStr == JUMP) {
                //
            } else if (rStr == WAIT) {
                //
            } else {

            }

            return null;
        }


        private bool ValidRequestStr(string rStr) {
            return (rStr == WALK || rStr == JUMP || rStr == WAIT || rStr == RUN);
        }

    }
}
