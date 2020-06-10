class Request {
    constructor(onSuccess,onError) {
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.onReadyStateChange.bind(this.onReadyStateChange);
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    onReadyStateChange() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            this.onSuccess(JSON.parse(this.request.responseText));
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