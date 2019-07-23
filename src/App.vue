<template>
  <v-app>
    
    <!-- ------------ header ------------ -->
    <v-navigation-drawer 
    app fixed
    dark temporary
    height="auto"
    :width='screenWidth'
    hide-overlay
    
    v-model="drawer"
    >
      <v-list>
          <v-list-tile
            v-for="link in links"
            :key="link.title"
            :to="link.url"

          >
            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark fixed color="#111" height="68px">
      <v-toolbar-title>
        <v-layout row>
          <v-img
            :src="require('./assets/gurushots.png')"
            width='50px'
            aspect-ratio="1.7"
            >
          </v-img>
          <!-- <v-icon large>camera</v-icon> -->
          <router-link to="/" tag="div" class="logo-title headline font-weight-medium">
            <span class="logo-guru">Guru</span>Shots
          </router-link>
        </v-layout>
      </v-toolbar-title>

      <div class="nav-menu hidden-sm-and-down">
        <v-btn flat v-for="link of links"
        :key="link.title"
        :to="link.url"
        >
          <span>{{link.title}}</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div class="user-menu">
        <v-btn
          flat
          @click.stop="dialogSignIN = true"
        >
          <span>Sign In</span>
        </v-btn>

        <v-btn
          flat
          @click.stop="dialogSignUP = true"
        >
          <span>Sign Up</span>
        </v-btn>
      </div>
      <v-toolbar-side-icon
        class=" hidden-md-and-up"
        @click="drawer=!drawer"
      ></v-toolbar-side-icon>
    </v-toolbar>
    <!-- ----------------- end header ----------------- -->

    <!-- отображение роутов в контент-->
    <v-content>
      <router-view></router-view>
    </v-content>


    <!-- ------------ footer ------------ -->
    <v-footer dark height="auto">
      <v-card class="flex pa-2" flat tile light>
        <v-card-title class="justify-center">
          <span class=" caption font-weight-light grey--text text--darken-1 mr-2">Follow us</span>
          <v-btn
            v-for="soc in socLinks"
            :key="soc.icon"
            :color="soc.color"
            :href="soc.url"
            target="_blank"
            class="mx-1"
            icon
            small
            dark
            >
            <v-icon small>{{ soc.icon }}</v-icon>
          </v-btn>
          <ul class="footer-links d-inline-block" >
            <li
              v-for="footlink in footLinks"
              :key="footlink.title"
              class=" d-inline-block mx-2"
            > <router-link :to="footlink.url"
                class="grey--text text--darken-1"
              >
                {{footlink.title}}</router-link></li>
          </ul>
        </v-card-title>

        <v-card-actions class="footer-gurushots justify-end  grey--text text--darken-1 pa-0 ">
          <b>&copy;</b> {{year}} GuruShots Ltd. All Rights reserved.
        </v-card-actions>
      </v-card>
    </v-footer>
    <!-- ------------ end footer ------------ -->

     <!-- Модальные окна -->

    <!-- окно авторизации -->
    <v-dialog
      v-model="dialogSignIN"
      max-width="400"
      origin="center right"
    >
      <v-card class="modal">
        <v-form
          ref="formIN"
          v-model="validIN"
          validation
        >
          <v-text-field
            prepend-icon="person"
            name="email"
            label="E-mail"
            type="email"
            required
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            name="password"
            label="Password"
            type="password"
            required
            v-model="password"
            :rules="passwordRules"
          ></v-text-field>

          <v-btn
            color="blue-grey lighten-4"
            class=" mt-3 px-4"
            @click="inSubmit"
            :disabled="!validIN"
          >sign in</v-btn>

          <div class="modal-switch">
              Don't have an account? <span @click="modalSwitch()">Sign up</span>
          </div>

          <div class="modal-close" @click="dialogSignIN=false; resetForm()">
            <v-icon>fas fa-times</v-icon>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- окно регистрации -->
    <v-dialog
      v-model="dialogSignUP"
      max-width="400"
    >
      <v-card class="modal">
        <v-form
            ref="formUP"
            v-model="validUP"
            validation
          >
          <v-text-field
            prepend-icon="person"
            name="email"
            label="E-mail"
            type="email"
            required
            v-model="email"
            :rules="emailRules"
          ></v-text-field>

          <v-text-field
            prepend-icon="lock"
            name="password"
            label="Password"
            type="password"
            required
            v-model="password"
            :rules="passwordRules"
          ></v-text-field>

          <v-text-field
            prepend-icon="lock"
            name="confirm-password"
            label="Confirm Password"
            type="password"
            required
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
          ></v-text-field>

          <v-btn
            color="blue-grey lighten-4"
            class=" mt-3 px-4"
            @click="upSubmit"
            :disabled="!validUP"
          >sign up</v-btn>

          <div class="modal-switch">
              Already have an account? <span @click="modalSwitch()">Sign in</span>
          </div>

          <div class="modal-close" @click="dialogSignUP=false; resetForm()">
            <v-icon>fas fa-times</v-icon>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script src='./assets/js/app.js'></script>
<style>
  @import './assets/css/app.css';
</style>
