<template>
  <div class="text-white">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title class=" text-color">Media Selector</md-dialog-title>
       
        <div class="md-layout-item md-layout md-gutter fix-container">

            <div class="md-layout-item md-size-20 text-center text-color ">
                <div class="fix-image" >
                <img src="../assets/apple.png">
                
                </div>
            <p>Apple</p>

            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/crown.png">
                
                </div>
<p>Crown</p>
            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/flower.png">
                
                </div>
<p>Flower</p>
            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/tree.png">
                
                </div>
<p>Tree</p>
            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/parrot.png">
                
                </div>
<p>Parrot</p>
            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/pig.png">
                
                </div>
<p>Pig</p>
            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/tree.png">
                
                </div>
<p>Tree</p>
            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/parrot.png">
                
                </div>
<p>Parrot</p>
            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/apple.png">
                
                </div>
<p>Apple</p>

            </div>
            <div class="md-layout-item md-size-20 text-center text-color">
                <div class="fix-image" >
                <img src="../assets/crown.png">
                
                </div>
<p>Crown</p>

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
  export default {
    name: 'mediaSelector',
    data: () => ({
      showDialog: false,
      images:[
      {name:"image 1",photo:`../assets/apple.png`},
      {name:"image 2",photo:`../assets/apple.png`},
      {name:"image 3",photo:`../assets/apple.png`},
      {name:"image 4",photo:`../assets/apple.png`},
      {name:"image 5",photo:`../assets/apple.png`},
      {name:"image 6",photo:`../assets/apple.png`},
      {name:"image 7",photo:`../assets/apple.png`},
      {name:"image 8",photo:`../assets/apple.png`},
      {name:"image 9",photo:`../assets/apple.png`},
      {name:"image 10",photo:`../assets/apple.png`},
      ]
    })
  }
</script>


<style>
.fix-container{
padding: 30px;
}
img{

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
}

.text-color{
color:white;

}
</style>

