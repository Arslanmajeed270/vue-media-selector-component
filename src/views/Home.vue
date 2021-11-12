<template>
  <div class="text-white">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title class=" text-color">Media Selector</md-dialog-title>
       
        <div class="md-layout text-color fix-container fix-width">
          <div class="md-layout-item md-layout">
            <div class="md-layout-item">
            Library
            </div>
            <div class="md-layout-item"><i class="far fa-square"></i></div>
          <div class="md-layout-item"><i class="fas fa-filter"></i></div>
          <div class="md-layout-item"><i class="fas fa-list"></i></div>
            </div>
          
        </div>
      <div class="md-layout-item md-layout md-gutter fix-container">
          <div class="md-layout-item">
            <div class="md-title text-color">All</div>
            <md-list >
              <md-list-item >
                <md-checkbox  value="preview" class="text-color" />
                <span  class="md-list-item-text text-color">Show content preview</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="sound" class="text-color" />
                <span class="md-list-item-text text-color">Sound</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="light" class="text-color" />
                <span class="md-list-item-text text-color">Notification light</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="vibrate" class="text-color" />
                <span class="md-list-item-text text-color">Vibrate</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="light" class="text-color" />
                <span class="md-list-item-text text-color">Notification light</span>
              </md-list-item>
              <md-list-item>
                <md-checkbox  value="vibrate" class="text-color" />
                <span class="md-list-item-text text-color">Vibrate</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="light" class="text-color" />
                <span class="md-list-item-text text-color">Notification light</span>
              </md-list-item>
            </md-list>
          </div>
         <div class="vr"></div>

          <div class="md-layout-item">
            <div class="md-title text-color">Scheduled</div>
            <md-list >
              <md-list-item >
                <md-checkbox  value="preview" class="text-color" />
                <span  class="md-list-item-text text-color">Show content preview</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="sound" class="text-color" />
                <span class="md-list-item-text text-color">Sound</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="vibrate" class="text-color" />
                <span class="md-list-item-text text-color">Vibrate</span>
              </md-list-item>

              <md-list-item>
                <md-checkbox  value="light" class="text-color" />
                <span class="md-list-item-text text-color">Notification light</span>
              </md-list-item>
            </md-list>
          </div>
        </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">Media Selector</md-button>
  </div>
</template>

<script>
// import axios from "axios"
  export default {
    name: 'mediaSelector',
    data: () => ({
      showDialog: false,
      data:null
    }),
    // async created() {
    // this.data = await axios.get('user/get-profile?access-token=1', {
    //   responseType: 'json',
    // });
  // },
  }
</script>


<style scopped>
.fix-container{
  padding: 30px;
}
.fix-image{
  width:160px;
  height:160px;
  padding: 35px;
  margin:10px;
  text-align:center;
  border: 1px solid white;
  border-radius:10px;
}

.md-dialog-container.md-theme-default {
    background-color: gray !important;
    width: 100%;
}
.md-list.md-theme-default {
    background-color: gray !important;
    color: white !important;
}

.md-checkbox.md-theme-default .md-checkbox-container {
    border-color:white !important;
}


.text-color{
  color:white;

}

.vr {
  border-left: 1px solid white;
  height: 400px;
}

.fix-width{
  width:25%
}
</style>

