<template>
  <v-app>
    <v-carousel
      hide-delimiters
      hide-controls
      interval=4000
      v-resize="setHeight"
      :height="jHeight"
    >
      <v-carousel-item
        v-for="(image,i) in jImages"
        :key="i"
      >
        <v-parallax 
          class=" hidden-md-and-down"
          height=370
          :src="image.src"
        ></v-parallax>

        <v-img
          class=" hidden-lg-and-up"
          :src="image.src"
          :height="jHeight"
        ></v-img>
      </v-carousel-item>
    </v-carousel>

    <!-- Desktop (960px > ) profile-menu -->
    <div class="profile-menu ">

      <div class="menu__item--left justify-start hidden-sm-and-down">
        <div class="menu__avatar">
          <v-img
          :src="require('../assets/image/avatar.jpg')"
          ></v-img>
        </div>
        <div class="menu__info align-center d-flex">
          <div>
            <div class="name">Stanislav Ovv</div>
            <div class="country">Russia</div>
          </div>
        </div>
        <div class="menu__points align-center d-flex">
          <div>
            <div class="number">21,800</div>
            <div class="align-center d-flex">
              <v-img
                :src="require('../assets/image/gs_points_icon.svg')"
                width=34
                height=16
                class=" d-inline-block"
              ></v-img>
              <span class="label">GS POINTS</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="menu__item--center hidden-sm-and-down">
        <v-img
          :src="require('../assets/image/status_6.png')"
        ></v-img>
      </div>

      <div class="menu__item--mobile hidden-md-and-up">
        <div class="menu__avatar">
          <v-img
          :src="require('../assets/image/avatar.jpg')"
          ></v-img>
        </div>
        <div class="menu__info align-center d-flex">
          <div>
            <div class="name">Stanislav Ovv</div>
            <div class="status">EXPERT</div>
            <div class="country">Russia</div>
          </div>
        </div>
        <div class="menu__points align-center d-flex">
          <div>
            <div class="align-center d-flex">
              <span class="number">21,800</span>
              <v-img
                :src="require('../assets/image/gs_points_icon.svg')"
                width=34
                height=16
                class=" d-inline-block"
              ></v-img>
            </div>
          </div>
        </div>
      </div>

      <div class="menu__item--right justify-end">
          <v-tabs
            slider-color="blue lighten-2"
            height=50
          >
            <v-tab
              @click="showTab(tabI)"
              mobile-break-point=960
              active-class="default-class tab__item-active"
              v-for="(tabI,i) in tabItems"
              :key="i"
              :href="'#home-' + tabI.title.toLowerCase()"
            >
              <div class="num">{{ tabI.num }}</div>
              <div>{{ tabI.title }}</div>
            </v-tab>
          </v-tabs>
      </div>
    </div>
    <!-- end desktop-->
    <!--  -->

  <!-- Вывод выбранных компонентов tab-item -->
    <div v-if="tabs=='PHOTOS'"><Photos/></div>
    <div v-else-if="tabs=='ACHIEVEMENTS'"><Achievements/></div>
    <div v-else-if="tabs=='FOLLOWERS'"><Followers/></div>
    <div v-else-if="tabs=='FOLLOWING'"><Following/></div>

  </v-app>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import Photos from '../components/Photos';
  import Achievements from '../components/Achievements';
  import Followers from '../components/Followers';
  import Following from '../components/Following';

  // export default {
  //   components: {
  //     HelloWorld
  //   }
  // }
  export default {
    name: 'Home',
    components: {
          // HelloWorld
          Photos, Achievements, Followers, Following
        },
    data () {
      return {
        jHeight:'370',
        jImages: [
          {
            src: require('../assets/image/jumbotron/green_grass.jpg')
            // src: 'https://photos.gurushots.com/unsafe/0x0/04fc353d79ffb662efd0357efcefe749/3_28ccec2554f7aee2ebb1d097852734f8.jpg'
          },
          {
            src: require('../assets/image/jumbotron/autumn_grass.jpg')
            // src: 'https://photos.gurushots.com/unsafe/0x0/04fc353d79ffb662efd0357efcefe749/3_6ca0891e4db1d74fd262d1e119d20f1a.jpg'
          },
          {
            src: require('../assets/image/jumbotron/dunesand.jpg')
            // src: 'https://photos.gurushots.com/unsafe/0x0/04fc353d79ffb662efd0357efcefe749/3_8b6bd5156faa811f6bd3b7acbecf389b.jpg'
          },
          {
            src: require('../assets/image/jumbotron/flight_storm.jpg')
            // src: 'https://photos.gurushots.com/unsafe/0x0/04fc353d79ffb662efd0357efcefe749/3_d5fb00f90d6ffb1871c1676c0505262a.jpg'
          },
          {
            src: require('../assets/image/jumbotron/sugomak.jpg')
            // src: 'https://photos.gurushots.com/unsafe/0x0/04fc353d79ffb662efd0357efcefe749/3_0de80c6e0d0e76ed3b4f3baa43721a45.jpg'
          },
        ],
        tabs: 'PHOTOS',
        tabItems: [
          {
            title: 'PHOTOS',
            ico: 'collections',
            num: '140',
          },
          {
            title: 'ACHIEVEMENTS',
            ico: 'fas fa-trophy',
            num: '29',
          },
          {
            title: 'FOLLOWERS',
            ico: 'fas fa-users',
            num: '23',
          },
          {
            title: 'FOLLOWING',
            ico: 'supervisor_account',
            num: '5',
          },
        ],
      }
    },
    mounted () {
      this.setHeight()
    },
    methods: {
      showTab (tab) {
        this.tabs = tab.title;
      },
      setHeight() {
        let screen = document.body.clientWidth;
        if (screen<=960) this.jHeight='270';
        else this.jHeight='370';
      },
    }
  }
</script>

<style>
@import '../assets/css/home.css';
</style>
