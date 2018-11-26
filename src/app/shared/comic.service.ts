import {Injectable, OnInit} from '@angular/core';
import {ListTableItem} from '../list-table/list-table-datasource';
import {Comicbook} from '../comicbook';
import {FormGroup} from '@angular/forms';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ComicService implements OnInit {
  EXAMPLE_DATA: ListTableItem[] = [
    {
      id: 11,
      name: 'Captain America',
      coverImgUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Captain_America_%28Steve_Rogers%29_All_New_All_Different_Marvel_version.jpg/170px-Captain_America_%28Steve_Rogers%29_All_New_All_Different_Marvel_version.jpg',
      publicationDate: new Date(1941, 12, 17),
      genre: 'Superhero',
      excerpt: `Steven Rogers was born in the Lower East Side of Manhattan, New York City,in 1925 to poor Irish immigrants, Sarah and Joseph Rogers.[54] Joseph died when Steve was a child, and Sarah died of pneumonia while Steve was a teen. By early 1940, before America's entry into World War II, Rogers is a tall, scrawny fine arts student specializing in illustration and a comic book writer and artist.`,
      writtenBy: 'Joe Simon',
      publisher: 'Marvel Comics'
    },
    {
      id: 12,
      name: 'Iron Man',
      coverImgUrl: 'https://vignette.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_37.jpg/revision/latest?cb=20170122060858',
      publicationDate: new Date(1941, 12, 17),
      genre: 'Superhero',
      excerpt: `Anthony Edward Stark, the son of wealthy industrialist and head of Stark Industries,
         Howard Stark, and Maria Stark. A boy genius, he enters MIT at the age of 15 to study electrical
         engineering and later receives master's degrees in electrical engineering and physics.
         After his parents are killed in a car accident, he inherits his father's company.`,
      writtenBy: 'Stan Lee',
      publisher: 'Marvel Comics'
    },
    {
      id: 13,
      name: 'Wolvarine',
      coverImgUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Marvelwolverine.jpg',
      publicationDate: new Date(1941, 12, 17),
      genre: 'Superhero',
      excerpt: `Wolverine was born James Howlett in northern Alberta,
           Canada, during the late 1880s, purportedly to rich farm owners John and Elizabeth Howlett,
           though he is actually the illegitimate son of the Howletts
          groundskeeper, Thomas Logan.[28] After Thomas is thrown off the
          Howletts property for an attempted rape perpetrated by his other son,
           named simply Dog, he returns to the Howlett manor and kills John Howlett.
           In retaliation, young James kills Thomas with bone claws that emerge from the back of his hands,
           as his mutation manifests.[29] He flees with his childhood companion, Rose, and grows into manhood on a mining
           colony in the Yukon, adopting the name "Logan".[30] When Logan accidentally kills Rose with his claws, he flees the
          colony and lives in the wilderness among wolves,[31] until he is captured and placed in a circus.[32] Saul Creed,
           brother of Victor Creed, frees Logan, but after he betrays Logan and Clara Creed to Nathaniel Essex, Logan drowns
          Creed in Essex's potion.[33] Logan returns to civilization, residing with the Blackfoot people.
          Following the death of his Blackfoot lover, Silver Fox, at the hands of Victor Creed, now known as
           Sabretooth,[34] he is ushered into the Canadian military during World War I. Logan spends time in Madripoor
           before settling in Japan, where he marries Itsu and has a son, Daken. Logan is unaware of his son for many years.`,
      writtenBy: 'Len Wein',
      publisher: 'Marvel Comics'
    },
    {
      id: 14,
      name: 'Spiderman',
      coverImgUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Web_of_Spider-Man_Vol_1_129-1.png/250px-Web_of_Spider-Man_Vol_1_129-1.png',
      publicationDate: new Date(1941, 12, 17),
      genre: 'Superhero',
      excerpt: `In Forest Hills, Queens, New York,[43] Midtown High School student Peter Parker is
        a science-whiz orphan living with his Uncle Ben and Aunt May.
        As depicted in Amazing Fantasy #15 (Aug. 1962), he is bitten by a radioactive spider
         (erroneously classified as an insect in the panel) at a science exhibit and "acquires
         the agility and proportionate strength of an arachnid".[44] Along with super strength,
          Parker gains the ability to adhere to walls and ceilings. Through his native knack for science,
           he develops a gadget that lets him fire adhesive webbing of his own design through small, wrist-mounted barrels.
           Initially seeking to capitalize on his new abilities, Parker dons a costume and, as "Spider-Man",
           becomes a novelty television star. However, "He blithely ignores the chance to stop a fleeing thief,
           [and] his indifference ironically catches up with him when the same criminal later robs and kills his Uncle Ben."
           Spider-Man tracks and subdues the killer and learns, in the story's next-to-last caption,
           "With great power there must also come-great responsibility!"[45]`,
      writtenBy: 'Stan Lee',
      publisher: 'Marvel Comics'
    },
    {
      id: 15,
      name: 'Thor',
      coverImgUrl: 'data:image/jpeg;base64,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',
      publicationDate: new Date(1941, 12, 17),
      genre: 'Superhero',
      excerpt: `
		Thor's father Odin decides his son needed to be taught humility and consequently places Thor
		 (without memories of godhood) into the body and memories of an existing, partially disabled human medical student,
		  Donald Blake.[52] After becoming a doctor and on vacation in Norway, Blake witnesses the arrival of an alien scouting party.
		   Blake flees from the aliens into a cave. After discovering Thor's hammer Mjolnir (disguised as a walking stick) and striking it
		    against a rock, he transforms into the thunder god.[53] Later, in Thor #159, Blake is revealed to have always been Thor, Odin's
		    enchantment having caused him to forget his history as The Thunder God and believe himself mortal.[54]`,
      writtenBy: 'Stan Lee',
      publisher: 'Marvel Comics'
    },
  ];


  constructor() {
  }

  ngOnInit() {

  }

  getComic(id: number) {
    const comic = this.EXAMPLE_DATA.find(
      (s) => {
        return s.id === id;
      }
    );
    return comic;
  }


  newComic(newComic: FormGroup) {
    const lastItem = this.EXAMPLE_DATA.length;
    const setId = this.EXAMPLE_DATA[lastItem - 1];
    console.log(setId);

    for (const el of this.EXAMPLE_DATA) {
      if (JSON.stringify(el) === JSON.stringify(newComic.value)) {
        break;
      } else {
        newComic.value['id'] = setId.id + 1;
        this.EXAMPLE_DATA.push(newComic.value);
        break;
      }
    }
  }

  deleteComic(deleteComic: FormGroup) {
    const item = this.EXAMPLE_DATA.find(this.findIndexToUpdate, deleteComic.value.id);

    const deleteItem = this.EXAMPLE_DATA.indexOf(item);
    if (deleteItem > -1) {

      this.EXAMPLE_DATA.splice(deleteItem, 1);

    }
  }

  updateComic(comic: FormGroup) {
    console.log(comic);
    const updateItem = this.EXAMPLE_DATA.find(this.findIndexToUpdate, comic.value.id);
    const index = this.EXAMPLE_DATA.indexOf(updateItem);
    this.EXAMPLE_DATA[index] = comic.value;

  }

  findIndexToUpdate(Item) {
    return Item.id === this;
  }
}
