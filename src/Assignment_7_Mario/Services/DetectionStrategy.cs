using System;
using Microsoft.Practices.TransientFaultHandling;
using System.Net;

namespace Assignment_7_Mario.Services {

    /*
    * This class creates an instance of a detection strategy in order to 
    * be implemented in the controller class in the retry policy
    */
    public class DetectionStrategy : ITransientErrorDetectionStrategy {
        public bool IsTransient(Exception ex) {
            var webExcepton = ex as WebException;

            if (webExcepton != null) {
                var webResponse = webExcepton.Response as HttpWebResponse;

                if (webResponse != null) {
                    return webResponse.StatusCode == HttpStatusCode.ServiceUnavailable;
                }
            }

            return false;
        }
    }
}
