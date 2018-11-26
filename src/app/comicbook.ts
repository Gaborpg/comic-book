export class Comicbook {


  constructor(public id: number,
              public name: string,
              public coverImgUrl: string,
              public publicationDate = new Date,
              public genre: string,
              public excerpt: string,
              public writtenBy: string,
              public publisher: string) {
  }

}
