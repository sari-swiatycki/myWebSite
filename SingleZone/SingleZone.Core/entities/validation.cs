using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.entities
{
  public  class validation
    {

        public static bool IsValidEmail(string value)
        {

            if (value == null)
                return false;
            int x = value.IndexOf('@');
            int y = value.LastIndexOf('.');
            if (x != -1 && y != -1 && y > x)
                return true;
            return false;

        }
       
    }



}

