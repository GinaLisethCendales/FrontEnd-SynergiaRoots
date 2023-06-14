// config

const config = {
    apiUrl: 'https://backend-synergiaroots.onrender.com',
    //apiUrl: 'http://localhost:8090',
};

// backend 
async function requestBackend(url, method, isAuth = false, data, responseBody, headers) {

    try {
        if(!headers){
            headers = { 'Content-Type': 'application/json' }
        }
       
        if (isAuth) {
            const token = JSON.parse(localStorage.getItem('token')) || "";
            headers['Authorization'] = `Bearer ${token}`
        }

        url = config.apiUrl + url

        const response = await axios({
            method: method,
            url: url,
            data: data,
            headers: headers
        });

        if (response.status == 200) {
            const formattedResponse = responseBody ? formatResponse(response.data, responseBody) : response.data;
            return formattedResponse;
        } else {
            return {}
        }
    } catch (error) {
        console.log(error)
        return {}
    }
}

function formatResponse(data, responseBody){
    return data.hasOwnProperty(responseBody) ? data[responseBody] : {}
}

