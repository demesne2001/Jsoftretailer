import axios from "axios"

export default async function post(inputJson, APINAME, defaultRes, methodType) {

    
    if (methodType === "post") {

        let header = {
            'Authorization':  `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        return await axios.post(APINAME, inputJson, { headers: header })
        // return await axios.post(APINAME, inputJson)
            .then((res) => {

                if (res.data.HasError === true) 
                {
                    defaultRes['statusText'] = res.data.Message[0]
                    defaultRes['status'] = 200
                    throw defaultRes
                }
                else
                {
                    return res
                }
               
            })
            .catch((E) => {
                if (E.status === 200) {
                    
                    defaultRes['Error'] = E.statusText
                    // alert(E)
                    console.log("errors",E);

                    return defaultRes
                    // throw defaultRes
                }
                else {
                 
                    // alert(E)
                    defaultRes['Error'] = E
                    console.log("errors",E);
                    return defaultRes
                    // throw defaultRes
                }
            })

    }
}
