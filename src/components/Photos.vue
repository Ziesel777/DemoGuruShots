<template>
  <div class="photos-comp">

    <!-- Строка поиска -->
    <v-layout
      class="search-container"
      justify-center=""
      align-center=""
      >
      <!-- <v-spacer></v-spacer> -->
      <v-flex md6>
        <v-text-field
          @keyup="searchClear"
          @keyup.enter="photoSearch"
          v-model="inputSearch"

          class="mx-3 mt-3 search"
          flat
          label="Search Photos"
          color = "#218ccc"
          single-line
          outline
        ></v-text-field>
        <div
          class="search-icon-layout"
          @click="photoSearch"
        >
          <v-icon>search</v-icon>
        </div>
      </v-flex>

      <!-- <v-spacer></v-spacer> -->

      <div class="sort-photo">
        <v-menu
          transition="scale-transition"
          origin="top center"
          offset-y
          allow-overflow
          open-on-hover
          close-delay=500
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class=" pl-4"
              outline
              color="#218ccc"
              v-on="on"
              @click="sortByPhoto"
            >
              {{ sortTitle.toUpperCase() }} <v-icon
              class=" ml-1"
              :style="arrowReverse()"
              >keyboard_arrow_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in filters"
              :key="index"
              @click="sortTitle=item.title, sortByPhoto(item.title)"

            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>

    </v-layout>

    <!-- Фото-галлерея -->
    <v-container
      class="photo-gallery"
      fluid grid-list-sm
    >
      <v-layout row wrap>
        <v-flex
          v-show="photo.isShow"

          v-resize="onResize"
          v-for="(photo,i) in photoAlbum" :key="i"
          class="photo__item " :class="phGrid"
        >
          <v-hover
            open-delay=300
          >
            <v-img
              slot-scope="{ hover }"
              :src=photo.url
              class="image"
              :height="phHeight"
              @click.stop="dialogPhoto = true; photoItem=photo"
            >
            <!-- Всплывающие элементы внутри фотографии -->
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-linear-out-fast-in white--text
                        bt-sheets"
                  style="height: auto;"
                >
                  <div>
                    <div class="item-title">{{photo.title}}</div>
                    <div class=" mb-2">
                      <div class="item-votes"><v-icon color="white">how_to_vote</v-icon> {{photo.vote}}</div>
                      <div class="item-views"><v-icon color="white">visibility</v-icon> {{photo.view}}</div>
                    </div>
                  </div>
                </div>
              </v-expand-transition>

              <v-expand-transition>
                <div
                  v-if="hover"
                  class="achiev display-1 d-flex"
                >
                  <v-img
                    :src=photo.achiev.url
                    max-width=130
                  ></v-img>
                </div>
              </v-expand-transition>
            </v-img>
          </v-hover>

          <!-- Просмотр фото во весь экран -->
          <v-dialog
            v-model="dialogPhoto"
            fullscreen
            dark
            persistent
          >
            <v-card class="">
              <v-img class="photo-view"
                contain
                max-height='100vh'
                :src=photoItem.url
              >
              <!-- Элементы навигации в просмоторщике -->
                <v-icon
                  class="close"
                  large
                  @click="dialogPhoto=false"
                >clear</v-icon>

                <div class="btn-arrow--h" :class="classBtnArrow" >
                  <v-icon
                    size=40
                    class="arrow_back hide"
                    @click="backPhoto()"
                  >arrow_back_ios
                  </v-icon>

                  <v-icon
                    size=40
                    class="arrow_next hide"
                    @click="nextPhoto()"
                  >arrow_forward_ios
                  </v-icon>
                </div>
              </v-img>
            </v-card>
          </v-dialog>

        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
let achievs = {
  top10: {
          url: require('../assets/image/achievement/top-10_white.svg'),
          power: 10
          },
  top20: {
          url: require('../assets/image/achievement/top-20_white.svg'),
          power: 20
          },
  top30: {
          url: require('../assets/image/achievement/top-30_white.svg'),
          power: 30
          },
  top100: {
          url: require('../assets/image/achievement/top-100_white.svg'),
          power: 100
            },
  guru_pick: {
          url: require('../assets/image/achievement/gurus-pick_white.svg'),
          power:300
          }
}

export default {
  data() {
    return {
      dialogPhoto: false,

      phHeight:300,
      phGrid:'',
      classBtnArrow: '',

      inputSearch:'',
      sortTitle:'SORT BY',
      rever: true, //состояние стрелки в конопке реверсивной сортировки

      photoItem:'',
      photoAlbum:[
        {
          title:'The ghost of war, of fascism, of total evil. Fire demon.',
          url:require('../assets/image/photo_album/pic_1.jpg'),
          vote: 2342,
          view: 1220,
          achiev: achievs.top10,
          tags:'',
          date:'2018-05-09',
          isShow: true,
        },
        {
          title:'Flight through the storm.',
          url:require('../assets/image/photo_album/pic_2.jpg'),
          vote: 1909,
          view: 1100,
          achiev: achievs.top20,
          tags:'',
          date:'2015-05-28',
          isShow: true,
        },
        {
          title:'Happy young grandmother with granddaughter.',
          url:require('../assets/image/photo_album/pic_3.jpg'),
          vote: 1602,
          view: 1676,
          achiev: achievs.top100,
          tags:'',
          date:'2018-10-05',
          isShow: true,
        },
        {
          title:'',
          url:require('../assets/image/photo_album/pic_4.jpg'),
          vote: 1262,
          view: 863,
          achiev: achievs.top30,
          tags:'flowers',
          date:'2018-06-20',
          isShow: true,
        },
        {
          title:'Snowflake flower in late autumn.',
          url:require('../assets/image/photo_album/pic_5.jpg'),
          vote: 1239,
          view: 948,
          achiev: achievs.top30,
          tags:'flowers',
          date:'2018-09-25',
          isShow: true,
        },
        {
          title:'',
          url:require('../assets/image/photo_album/pic_6.jpg'),
          vote: 2926,
          view: 2641,
          achiev: achievs.guru_pick,
          tags:'',
          date:'2018-09-29',
          isShow: true,
        },
      ],
      filters: [
        { title: 'Votes'},
        { title: 'Views'},
        { title: 'Achievements' },
        { title: 'Newest' },
      ]
    }
  },
  mounted () {
    this.onResize(),
    this.sortByPhoto('Newest')
  },
  methods: {

    // навигация в окне просмотра
    nextPhoto() {
      let photo = this.photoItem;
      let index = this.photoAlbum.indexOf(photo);

      index++;

      if (index < this.photoAlbum.length) {
        while (!this.photoAlbum[index].isShow) {
          index++;
          if (index == this.photoAlbum.length) index = 0;
        }

        this.photoItem = this.photoAlbum[index];
      } else {
        index = 0;
        this.photoItem = this.photoAlbum[index];
      }
    },
    backPhoto() {
      let photo = this.photoItem;
      let index = this.photoAlbum.indexOf(photo);

      index--;
      if (index >= 0 ) {
        while (!this.photoAlbum[index].isShow) {
          index--;
          if (index < 0) index = this.photoAlbum.length-1;
        }

        this.photoItem = this.photoAlbum[index];
      } else {
        index = this.photoAlbum.length-1;
        this.photoItem = this.photoAlbum[index];
      }
    },

    // функция, отслеживающая изменение ширины, высоты окна, делающая поправки в коде
    onResize() {
      // адаптация высоты и расположения фото в альбоме
      let screen = document.body.clientWidth;
      if(screen<490) {
        this.phHeight=240;
      } else if (screen>=490 && screen<720) {
        this.phGrid = 'xs12';
        this.phHeight=300;
      } else if (screen>=720 && screen<960) {
        this.phGrid = 'xs6';
        this.phHeight=240;
      } else if(screen>=960) {
        this.phGrid = 'xs6';
        this.phHeight=300;
      }

      // адаптация зоны расположения стрелок навигации в окне просмотра
      let pvHeight = document.documentElement.clientHeight;
      let pvWidth = document.documentElement.clientWidth;
      if ((pvHeight*3/2)<=pvWidth) {
        this.classBtnArrow = '';
      } else {
        this.classBtnArrow = 'btn-arrow--v';
      }
    },

    //очистка поиска при удалении строки из input
    searchClear() {
      let str = this.inputSearch;
      if (str=='') {
        this.photoAlbum.forEach(photo => {
          photo.isShow=true;
        });
      }
    },

    // поиск фото
    photoSearch() {
      let str = this.inputSearch;
      let album = this.photoAlbum;
      // console.log(str);

      album.forEach(photo => {
        if (str!='') {
            let tags = photo.tags;

            if(tags.indexOf(str.toLowerCase())!=-1) photo.isShow=true;
            else photo.isShow=false;
        }
      });
    },

    // сортировка фото
    sortByPhoto(filter) {
      let album = this.photoAlbum;

      switch (filter) {
        case 'Votes':
          votes(album);
          this.rever = true;
          break;
        case 'Views':
          views(album);
          this.rever = true;
          break;
        case 'Achievements':
          achiev(album);
          this.rever = true;
          break;
        case 'Newest':
          newest(album);
          this.rever = true;
          break;

        default:
          console.log('Album reverse');
          this.rever = !(this.rever);
          return album.reverse();
          break;
      }

      function votes(album) {
        console.log('Votes');
        
        album.sort((a,b)=>{
          if(a.vote<b.vote) return 1;
          if(a.vote>b.vote) return -1
        });
        return album;
      };

      function views(album) {
        console.log('Views');
        
        album.sort((a,b)=>{
          if(a.view<b.view) return 1;
          if(a.view>b.view) return -1
        });
        return album;
      };

      function achiev(album) {
        console.log('Achievements');

         album.sort((a,b)=>{
          if(a.achiev.power<b.achiev.power) return 1;
          if(a.achiev.power>b.achiev.power) return -1
        });
        return album;
      };

      function newest(album) {
        console.log('Newest');

        album.sort((a,b)=>{
          if(a.date<b.date) return 1;
          if(a.date>b.date) return -1
        });
        return album;
      };
    },
    // разворот стрелки в кнопке при реверсионной сортировке
    arrowReverse() {
      if(this.rever) {
        return "transform: scaleY(1)"
      } else {
        return "transform: scaleY(-1);"
      }
    },
  }
}
</script>

<style>
@import '../assets/css/home_component/photos.css';
</style>



