import axios from "axios"
import API from "./API"

export default async function post(inputJson, APINAME, defaultRes, methodType) {
    let header = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (methodType === "post") {       

        return await axios.post(APINAME, inputJson, { headers: header })
        // return await axios.post(APINAME, inputJson)
            .then((res) => {
                // console.log("api handle res", res);
                if (res.data.HasError === true) 
                {
                    defaultRes['statusText'] = res.data.Message[0]
                    defaultRes['status'] = 200
                    throw defaultRes
                }
                else {
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
    else if (methodType === 'get') {
        return await axios.post(APINAME,{},{ headers: header })
            .then((res) => {
                // console.log("api handle res", res);
                if (res.data.HasError === true) {
                    defaultRes['statusText'] = res.data.Message[0]
                    defaultRes['status'] = 200
                    throw defaultRes
                }
                else {
                    return res
                }

            })
            .catch((E) => {
                if (E.status === 200) {

                    defaultRes['Error'] = E.statusText
                    // alert(E)
                    return defaultRes
                    // throw defaultRes
                }
                else {

                    // alert(E)
                    defaultRes['Error'] = E
                    return defaultRes
                    // throw defaultRes
                }
            })
    }    
}
