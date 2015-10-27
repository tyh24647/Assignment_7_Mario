using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;

namespace Assignment_7_Mario.Services {
    
    /*
    * This interface allows for methods and fields from the MarioService to
    * be accessed without allowing the end-user or other classes/methods to
    * directly access or edit the data.
    */
    public interface IMarioService {
       WebRequest InitWebRequestFromInputStr(string rStr);
    }
}
