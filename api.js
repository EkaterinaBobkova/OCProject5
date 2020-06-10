class Request {
    constructor(onSuccess,onError) {
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.onReadyStateChange.bind(this.onReadyStateChange);
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    onReadyStateChange() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            this.onSuccess(this.request.responseText);
    }
}
get(url) {
    this.request.open('get', url);
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