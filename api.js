class Request {
    constructor(onSuccess,onError) {
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.onReadyStateChange.bind(this, this.request);
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    onReadyStateChange(request) {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            this.onSuccess(JSON.parse(request.responseText));
            console.log("Connection established");

    }else{
        console.log("Error connection API");
    }
}
get(url) {
    this.request.open('GET', url, true);
    this.request.setRequestHeader('Content-Type', 'application/json')
    this.request.send();
}
}




class Api {
    list(callback){
        const apiRequest = new Request(function(response) {
            callback(response);
        })
        apiRequest.get("http://localhost:3000/api/cameras");
    }
}
