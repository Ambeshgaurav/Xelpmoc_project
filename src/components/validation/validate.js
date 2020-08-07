let isUsedVar = false;

export const requiredField = (val , fieldName) =>{
    if(!val && isUsedVar){
        switch(fieldName){
            case 'name' : {
               isUsedVar = false;
               return true;
            }
            case 'email' : {
                isUsedVar = false;
                return true;
            }
            case 'password' : {
                isUsedVar = false;
                return true; 
            }

            default :
             return false;
        }
    }
}


export const isUsed = (val , fieldName) => {
    isUsedVar = true;
    //nameOfField = fieldName;
}

