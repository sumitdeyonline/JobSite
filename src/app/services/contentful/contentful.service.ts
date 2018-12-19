import { Injectable, OnInit } from '@angular/core';
//import { createClient, Entry } from 'contentful';
import { CONTENT_CONFIG } from '../../global-config';
import { Http, Headers } from "@angular/http";
import { AppError } from './../../common/exception/app-error';
import { NotFoundError } from './../../common/exception/not-found-error';
import { BadInput } from './../../common/exception/bad-input';
import { Observable } from 'rxjs';
import { createClient, Entry  } from '../../../../node_modules/contentful';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  /*private cdaClient = createClient({
    space: CONTENT_CONFIG.space,
    accessToken: CONTENT_CONFIG.accessToken
  });*/
  private headers;
  //constructor(private http: Http,private url: string, private space: string, private accessToken: string, private contenttypeId: string, private contentId: string) { 
  constructor(private space: string, private accessToken: string) { 
  }
  private cdaClient = createClient({
    space: this.space,
    accessToken: this.accessToken
  });
  /*logContent(contentId) {
    this.cdaClient.getEntry(contentId)
    .then((entry) => console.log(entry))
  }*/
  ngOnInit() {
    //console.log("ngOnInit $$##### >>>>");
    //this.assignHeaderVariable();
  }
  getAllContent(fields?: string,query?: object, contenttypeId?: string): Promise<Entry<any>[]> {
    console.log("Content Ful Service ........")

    //query =  this.contentId;
    return this.cdaClient.getEntries(Object.assign({
      select: fields,      
      content_type: contenttypeId
    }, query))
    .then(res => res.items);
  }
  
  getAllContentOrderBy(fields?: string,query?: object, contenttypeId?: string, orderBy?: string): Promise<Entry<any>[]> {
    console.log("Content Ful Service ........")
    //query =  this.contentId;
    return this.cdaClient.getEntries(Object.assign({
      select: fields,      
      content_type: contenttypeId,
      order: orderBy
    }, query))
    .then(res => res.items);
  }

  /*getAll() {
    let contentURL = this.url + this.space + "/entries?content_type="+this.contenttypeId;
    console.log("Content Ful URL >>>> ........"+contentURL);
    this.assignHeaderVariable();
    return this.http.get(contentURL, { headers: this.headers })    
        .map(response => response.json())
        .catch(this.handleError);
  }*/

  /*getContentTypes() {
// getting a specific Post
return this.cdaClient.getEntries({'sys.id': '<entry-id>'}).then((response) => {
  // output the author name
  console.log(response.items[0].fields.author.fields.name)
}).catch((err) => console.log(err))
  }*/

  /*markdownToHtml(md: string) {
    return marked(md)
  }*/

  /*private assignHeaderVariable() {
    //var aToken = "Bearer "+this.accessOktatoken;
    this.headers = new Headers();
    
    this.headers.append("Authorization", CONTENT_CONFIG.Authorization); //"H195LByGb9y1WzDAXY3i63D-G_6220eKW2WOisAc"
    this.headers.append("Content-type", CONTENT_CONFIG.CntentType); //"0oaiy2wgm8BVVKBga0x7"

}*/

  /*private handleError(error: Response) {
    console.log("EROORRRRRRRRRRRRRR......");
    let errorVal = { logdetails: error, logdate: (new Date).toString(), errorType: 'General', category: 'Home', createdBy: 'Sumit'  }    
    console.log("errorVal  ::::: "+errorVal);
    this.logservice.createLogg(errorVal)
      .map(response => response.json())
      .catch(this.handleError);   
    
      //console.log("errorVal HHHHHHH   ::::: ");
    //let service: LogService
    if (error.status === 400) {
        return Observable.throw(new BadInput(error.json()+" URL1 : "));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }

    return Observable.throw(new AppError(error));
  }*/

}
