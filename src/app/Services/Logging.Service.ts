import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    http: HttpClient = inject(HttpClient);


    logError(data:{statusCode: number, errorMessage: string, dateTime: Date}){
        this.http.post('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/logs.json', data).subscribe((res)=>{
            console.log(res);
        });
    }
    fetcherrors(){
        this.http.get('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/logs.json').subscribe((response)=>{
            console.log(response);
        });
    }

}
