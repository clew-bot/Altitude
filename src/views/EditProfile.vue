<template>
<div class="container">
<v-card width="500" class="vcard">
  <img src="api/images/18be4c1ca401efdbd1854d238125a7bd" alt="">
  <FormulateForm
  @submit="submitEdit"
    v-model="formValues"
    class="formulate-form"
  >
    <h2 class="form-title">Edit Profile
    </h2>
    <p>
      Any changes will go unsaved unless you click the "Save" button.
    </p>
     <input type="file"  @change="upload($event)" id="file-input">
        <!-- <FormulateInput
      type="image"
      name="profilePic"
      label="Profile Picture"
    /> -->
    <FormulateInput
      name="name"
      type="text"
      label="Name"
      placeholder="Name"
      value=""
    />
    <FormulateInput
      name="headline"
      type="text"
      label="Headline"
      placeholder="Badass who loves walking their dog"
    />
       <FormulateInput
      name="bio"
      type="textarea"
      label="Bio"
      placeholder="Something that describes you"
    />
    
    <v-divider></v-divider>
    <br/>
       <FormulateInput
      name="movie"
      type="text"
      label="Favorite Movie"
      placeholder="Spider-Man 2"
    />
       <FormulateInput
      name="food"
      type="text"
      label="Favorite Food"
      placeholder="Donuts, Sushi, etc"
    />
          <FormulateInput
      name="hobbies"
      type="text"
      label="Favorite Hobbies"
      placeholder="Playing basketball"
    />
          <FormulateInput
      name="music"
      type="text"
      label="Favorite Music"
      placeholder="Classical Jazz"
    />
          <FormulateInput
      name="books"
      type="text"
      label="Favorite Books"
      placeholder="Steve Jobs by Walter Isaacson"
    />
    <div class="double-wide">
  
    </div>
    <div class="submitBtn">
    <FormulateInput
      type="submit"
      label="Save"
    />
    </div>
    <pre
      class="code"
      v-text="formValues"
    />
  </FormulateForm>
  </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formValues: {}
    }
  },
  name: 'EditProfile',
  methods: {
    async submitEdit() {
      console.log(this.formValues)
    },
 async upload(event){
    let fd = new FormData();
    let file = event.target.files[0];
    fd.append('image', file);
    console.log("FD = ", fd)

     const res = await fetch('/api/uploadprofilepic', {
      method: 'POST',
      body: fd,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    }
    )
    const data2 = await res.json();
    console.log(data2)
  }
  }
}
</script>

<style scoped>

.submitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vcard {
  background-color: #f0f0f1 !important;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
  
  .formulate-form {
    padding: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
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
    width: calc(50% - .5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: .5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: .5em;
  }
}
</style>