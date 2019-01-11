import { Component, OnInit } from '@angular/core';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'technews',
  templateUrl: './tech-news.component.html',
  styleUrls: ['./tech-news.component.css']
})
export class TechNewsComponent implements OnInit {
  private techNews: Entry<any>[] = [];

  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.techNewsQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(techNews => this.techNews = techNews)     
  }

}
