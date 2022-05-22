<template>
  <div class="container">
    <v-card class="vcard">
      <!-- <img src="api/images/ed38a63b6ba71283e1e5ff7c08e99bc7" alt=""> -->
   

      <FormulateForm @submit="submitEdit" class="formulate-form">
        <div class="field-container">
  
<div class="details-container">
        <h2>Details</h2>
         <v-divider class="divider"></v-divider>
      <FormulateInput
          type="image"
          name="profilePic"
          label="Profile Picture"
          upload-behavior="delayed"
        
        />
        <FormulateInput
          name="name"
          type="text"
          label="Name"
          placeholder="Name"
          v-model="name"
        />
    
        <FormulateInput
          name="headline"
          type="text"
          label="Headline 🥳"
          placeholder="Badass who loves walking their dog"
          v-model="headline"
          live-validate
          :validation="[ ['max', 16], ['min', 0]]"
        />
        <FormulateInput
          name="bio"
          type="textarea"
          class="bio-textarea"
          label="Bio 🌅"
          placeholder="Something that describes you"
          v-model="bio"
          :validation="[ ['max', 200], ['min', 0]]"
        />
</div>
<div class="favorites-container">
  <v-divider class="divider"></v-divider>
    <h3 class="favorites-text">Choose a background <span id="thumbs">🎨</span></h3>
      <v-color-picker
      v-model="color"
      class="ma-4 color-switcher"
      swatches-max-height="200px"
    >
    
    </v-color-picker>
    <div class="checkbox">

 </div>
  <h3 class="favorites-text">Favorites <span id="thumbs">👍</span></h3>
        <FormulateInput
          name="movie"
          type="text"
          label="Movie 🎬"
          placeholder="Spider-Man 2"
          v-model="movie"
        />
        <FormulateInput
          name="food"
          type="text"
          label="Food 🍕"
          placeholder="Donuts, Sushi, etc"
          v-model="food"
        />
        <FormulateInput
          name="hobbies"
          type="text"
          label="Hobbies 🎭"
          placeholder="Playing basketball"
          v-model="hobbies"
        />
        <FormulateInput
          name="music"
          type="text"
          label="Music 🎧"
          placeholder="Classical Jazz"
          v-model="music"
        />
        <FormulateInput
          name="books"
          type="text"
          label="Books 📚"
          placeholder="Steve Jobs by Walter Isaacson"
          v-model="books"
        />
        </div>
        </div>
        <div class="double-wide"></div>
        <div class="submitBtn">
          <FormulateInput type="submit" label="Save" />
        </div>
      </FormulateForm>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      headline: "",
      bio: "",
      movie: "",
      food: "",
      hobbies: "",
      music: "",
      books: "",
      color: "",
      username: "",
    };
  },
  name: "EditProfile",
  methods: {
    getColor() {
      console.log(this.color);
    },
    async getDetails() {
      const response = await fetch("/api/getEditDetails");
      const data = await response.json();
      console.log(data)
      this.name = data.name;
      this.headline = data.headline;
      this.bio = data.bio;
      this.movie = data.favoriteMovies;
      this.food = data.favoriteFood;
      this.hobbies = data.favoriteHobbies;
      this.music = data.favoriteMusic;
      this.books = data.favoriteBooks;
      this.color = data.backgroundColor;
      this.username = data.username;
    },
  
    async submitEdit() {
      try {
      const response = await fetch("api/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          headline: this.headline,
          bio: this.bio,
          movie: this.movie,
          food: this.food,
          hobbies: this.hobbies,
          music: this.music,
          books: this.books,
          backgroundColor: this.color,
        }),
      });
      console.log(this.color)
      const data = await response.json();
      console.log(data);
      this.$router.push("/profile/" + this.username)
      } catch (err) {
        console.log(err);
      }
    },
    async upload(event) {
      let fd = new FormData();
      let file = event.target.files[0];
      fd.append("image", file);
      console.log("FD = ", fd);

      const res = await fetch("/api/uploadprofilepic", {
        method: "POST",
        body: fd,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      const data2 = await res.json(); 
      console.log(data2);
    },
  },
  created() {
    this.getDetails();
  },
  
};
</script>

<style scoped>

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-switcher {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: rgba(200, 206, 201, 0.617);
}


.divider {
  margin: 15px 10px;
}
.details-container {
  display: flex;
  flex-direction: column;
    justify-content: right;
  /* max-width: 1000px;
  min-width: 400px; */
    width: 100%;
}
.favorites-container {
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: 100%;
}
.formulate-input input {
  border: solid 2px hotpink !important;
}

.formulate-input[data-classification=textarea] textarea {
  height: 1000px !important;
}

.formulate-input {

  padding: 6px;

}
.field-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center !important; 
  padding: 10px;
}

.submitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vcard {
  background-color: #ebebeb !important;
  width: 350px;

}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.formulate-form {

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: 0.5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - 0.5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: 0.5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: 0.5em;
  }
}
</style>
