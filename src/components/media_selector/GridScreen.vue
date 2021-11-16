<template>
     <div class="gridScreenWrapper">
      <div class="gridScreenHeader">
        <div class="gsHeader">
          <p>Visuals</p>
        </div>
        <div class="gsOrderInput">
          <div class="selectWrapper">
            <select class="selectBox">
              <option>Order dummy content</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
            </select>
          </div>
          <div class="selectWrapper">
            <select class="selectBox">
              <option>Order by Wane</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
            </select>
          </div>
          <div class="selectWrapper">
            <input type="text" class="selectBox" />
            <img src="../../assets/search-solid.svg" width="15" />
          </div>
        </div>
      </div>
      <div class="gridScreenBody">
        <div class="gridScreenBodyContainer">
          <div class="gridScreenFilterSection">
            <img src="../../assets/square-regular.svg" width="15" alt="checkbox" />
            <img src="../../assets/filter-solid.svg" width="15" alt="checkbox" />
            <img src="../../assets/th-solid.svg" width="15" alt="checkbox" />
            <img src="../../assets/list-solid.svg" width="15" alt="checkbox" />
          </div>
          <div class="gridScreenImageSection">
            <div
              class="gridScreenImage"
              :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/crown.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/flower.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/hen.jpg')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/parrot.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/pig.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/tree.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/apple.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/crown.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/flower.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/hen.jpg')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/parrot.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/pig.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/tree.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/apple.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/crown.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/flower.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/hen.jpg')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/parrot.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/pig.png')"
            ></div>
            <div
              class="gridScreenImage"
              style="background-image: url('/assets/dummy/tree.png')"
            ></div>
          </div>
        </div>
      </div>
      
      <div class="gridScreenFooter">
        <button class="cancelButton" @click="closeModal">Cancel</button>
        <button class="saveButton">Use</button>
      </div>
    </div>
</template>

<script>

export default {
    name: "GridScreen",
    props: [
        "closeModal"
    ],
    data(){
        return{
            imageUrl: '/assets/dummy/apple.png'
        }
    }

}
</script>

<style scoped>
 .gridScreenWrapper {
        height: 100%;
        width: 100%;
      }
      .gridScreenHeader {
        height: 8%;
        background-color: #9d9d9c;
        width: 100%;
        display: flex;
        margin: auto;
      }

      .gsHeader {
        flex: 3;
        margin: auto;
        text-align: left;
      }
      .gsHeader > p {
        margin-left: 10%;
        font-size: 18px;
        color: white;
      }
      .gsOrderInput {
        flex: 4;
        margin: auto;
        display: flex;
        gap: 40px;
      }
      .gridScreenBody {
        height: auto;
        max-height: 78%;
        min-height: 78%;
        overflow-y: auto;
      }
      .gridScreenBodyContainer {
        width: 85%;
        margin: auto;
        padding: 20px 0;
      }
      .gridScreenFooter {
        height: 8%;
        border-top: 3px solid #7e7e7e;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3em;
      }

      .gridScreenFilterSection {
        display: flex;
        gap: 20px;
      }

      .gridScreenImageSection {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 3.5em;
        padding: 3.5em 0;
      }
      .gridScreenImage {
        width: 160px;
        height: 100px;
        background-size: 160px 100px;
      }

      .cancelButton {
        background-color: transparent;
        border-radius: 5px;
        font-size: 17px;
        font-family: "Source Sans Pro", sans-serif;
        padding: 2px 18px;
        border: 2px solid #fff;
        color: #fff;
        width: 120px;
        cursor: pointer;
      }

      .saveButton {
        background-color: #fcb13b;
        border-radius: 5px;
        font-size: 17px;
        font-family: "Source Sans Pro", sans-serif;
        padding: 2px 18px;
        color: black;
        width: 120px;
        border: 0px;
        cursor: pointer;
      }

      /* Select box css */
      .selectWrapper {
        border-radius: 36px;
        display: inline-block;
        overflow: hidden;
        background: transparent;
        border: 3px solid #e4a644;
        padding: 0px 5px;
        display: flex;
      }
      .selectBox {
        width: 200px;
        border: 0px;
        background: transparent;
        color: #fff;
        outline: #e4a644;
      }

      .selectBox > option {
        background: #9d9d9c;
      }
</style>

