<template>
  <div class="hello">
    <img src='@/assets/logo-mine.png'><br>
    
    <button style="width: 300px; height: 25px; margin: 5px 0px;" v-on:click="changeMode" :disabled="bomb_mode">Place Bomb Mode</button><br>
    <button style="width: 300px; height: 25px; margin-top: 5px; margin-bottom: 20px;" v-on:click="changeMode" :disabled="!bomb_mode">Place "Absolutely No Bomb" Flag Mode</button><br>
	
    <a v-for="j in b_height"><a v-for="i in b_width">
      <input type="button" style="color:white; background-color: white; width: 24px; height: 24px; font-weight: bold;"
      :id="'btn' + i + '_' + j" v-on:click="addOrRemoveBomb(i,j)" :disabled="board[j][i] == 9" :value="board[j][i]"></input></a><br>
    </a>
    <p>---</p>


    <h4>Random Bomb Generator</h4>
    <form v-on:submit.prevent="assignBombs">
      <h5>Number of Bombs</h5>
      <input style="width: 200px; height: 25px; text-align: right;" v-model="start_bombs" type="number" name="bombs" min="0" max="900"><br>
      <button style="margin-top: 40px; width: 200px; height: 25px;" type="submit">Generate</button>
    </form>

    <p>---</p>
   

<!--
    <h4>Customize Board Size</h4>
    <form v-on:submit.prevent="resetBoard">
      <h5>Height</h5>
      <input style="width: 200px; height: 25px; text-align: right;" v-model="n_height" type="number" name="height" min="8" max="100">
      <h5>Width</h5>
      <input style="width: 200px; height: 25px; text-align: right;" v-model="n_width" type="number" name="width" min="8" max="100">
      <br>
      <button style="margin-top: 40px; width: 200px; height: 25px;" type="submit">Reset</button>
    </form>

    <p></p>
    -->
    
  </div>
</template>

<script>
//import router from '@/router'

export default {

  name: 'VueDemo',
  data () {
    return {
      b_height: 30,
      b_width: 30,
      board: [],
      flag: [],
      reveal: [],
      start_bombs: 0,
      direction: [],
      gameState: 0,
      bombs: 0,
      remaining: 0,
      flags: 0,
      flagState: 0,
      styles: ['white','blue','green','red','navy','maroon','teal','black','grey'],
      bomb_mode: true,
    }
  },
  methods: {
  	changeMode() {
  		if (this.bomb_mode) {
  			this.bomb_mode = false;
  		} else {
  			this.bomb_mode = true;
  		}
  	},
    getNumberColor(no,x,y) {
      if (no === "b") {
        document.getElementById("btn"+x+"_"+y).style = {
        'color': 'black'
        };
        return 'black';
      } else {
        document.getElementById("btn"+x+"_"+y).style = {
        'color': 'white'
        };
        return 'white';
      }
    },
    addOrRemoveBomb(x,y) {
      //console.log(x);
      //console.log(y);
      if (this.flag[y][x] === "x" && this.bomb_mode) {
      	return;
      }
      if (this.board[y][x] === "b") {
      	if (!this.bomb_mode) {
      		return;
      	}
        this.board[y][x] = 0;
        document.getElementById("btn"+x+"_"+y).value = this.board[y][x].toString();
        var myElement = document.querySelector("#btn"+x+"_"+y);
        myElement.style.color = "white";
        myElement.style.backgroundColor = "white";
        this.remaining++;
        this.bombs--;
      } else {
      	if (!this.bomb_mode) {
      		//document.getElementById("btn"+x+"_"+y).value = this.board[y][x].toString();
      		if (this.flag[y][x] === "x") {
		      	this.flag[y][x] = 0;
		        var myElement = document.querySelector("#btn"+x+"_"+y);
		        myElement.style.backgroundColor = "white";
		        this.remaining++;
		      } else {
		      	this.flag[y][x] = "x";
		        var myElement = document.querySelector("#btn"+x+"_"+y);
		        myElement.style.backgroundColor = "silver";
		        this.remaining--;
		      }
      		
      		return;
      	}
        this.board[y][x] = "b";
        document.getElementById("btn"+x+"_"+y).value = this.board[y][x].toString();
        var myElement = document.querySelector("#btn"+x+"_"+y);
        myElement.style.color = "black";
        myElement.style.backgroundColor = "red";
        this.remaining--;
        this.bombs++;
      }

      this.assignNumbers();

      //console.log(this.board);

    },
    assignBombs() {
      if (this.start_bombs > this.remaining) {
      	alert("Too many bombs to fit current remaining spaces!!");
      	return;
      }
      for (var k = 0; k < this.start_bombs; k++) {
        var tempX = Math.floor(Math.random() * this.b_width) + 1;
        var tempY = Math.floor(Math.random() * this.b_height) + 1;
        while ((this.board[tempY])[tempX] === "b" || (this.flag[tempY])[tempX] === "x") {
          tempX = Math.floor(Math.random() * this.b_width) + 1;
          tempY = Math.floor(Math.random() * this.b_height) + 1;
        }
        this.board[tempY][tempX] = "b";
        document.getElementById("btn"+tempX+"_"+tempY).value = this.board[tempY][tempX].toString();
        var myElement = document.querySelector("#btn"+tempX+"_"+tempY);
        myElement.style.color = "black";
        myElement.style.backgroundColor = "red";
        this.remaining--;
      }
      for (var i = 1; i < this.b_width+1; i++) {
        for (var j = 1; j < this.b_height+1; j++) {
          if (this.board[j][i] === "b") {
            this.bombs++;
          }
        }
      }
      //setProperty("bombCounter", "text", "0"+this.bombs);
      this.assignNumbers();
    },
    assignNumbers() {

      for (var i = 1; i < this.b_width+1; i++) {
        for (var j = 1; j < this.b_height+1; j++) {
          if (this.board[j][i] !== "b") {
              this.board[j][i] = 0;
              var myElement = document.querySelector("#btn"+i+"_"+j);
              document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
              //document.getElementById("btn"+i+"_"+j).style = this.style0;
              if (j !== 1 && i !== 1) {
                if (this.board[j-1][i-1] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }
              if (j !== 1) {
                if (this.board[j-1][i] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }
              if (j !== 1 && i !== this.b_width) {
                if (this.board[j-1][i-(-1)] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }
              if (i !== 1) {
                if (this.board[j][i-1] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }
              if (i !== this.b_width) {
                if (this.board[j][i-(-1)] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }
              if (j !== this.b_height && i !==1) {
                if (this.board[j-(-1)][i-1] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }
              if (j !== this.b_height) {
                if (this.board[j-(-1)][i] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }
              if (j !== this.b_height && i !== this.b_width) {
                if (this.board[j-(-1)][i-(-1)] === "b") {
                  this.board[j][i]++;
                  document.getElementById("btn"+i+"_"+j).value = this.board[j][i].toString();
                }
              }

              myElement.style.color = this.styles[this.board[j][i]];
          }
        }
      }

      var l = 1;
      var m = 1;
      for (l = 1; l < this.b_height+1; l++) {
          for (m = 1; m < this.b_width+1; m++) {
            if (this.board[l][m] !== 0 && this.board[l][m] !== "b") {
              (this.reveal[l])[m] = this.board[l][m];
            }
          }
      }

    },
    initBoard() {
    	var y = 0;
	    var x = 0;

	    this.board = [ ];
	    for(y = 0; y < this.b_height+2; ++y) {
	        this.board[y] = [ ];
	        for(x = 0; x < this.b_width+2; ++x) {
	            if (y == 0 || y == this.b_height+1 || x == 0 || x == this.b_width+1){
	              this.board[y][x] = 9;
	            } else {
	              this.board[y][x] = 0;
	            }
	        }
	    }

	    this.flag = [ ];
	    for(y = 0; y < this.b_height+2; ++y) {
	        this.flag[y] = [ ];
	        for(x = 0; x < this.b_width+2; ++x) {
	            this.flag[y][x] = 0;
	        }
	    }

	    this.reveal = [ ];
	    for(y = 0; y < this.b_height+2; ++y) {
	        this.reveal[y] = [ ];
	        for(x = 0; x < this.b_width+2; ++x) {
	            if (y == 0 || y == this.b_height+1 || x == 0 || x == this.b_width+1){
	              this.reveal[y][x] = 9;
	            } else {
	              this.reveal[y][x] = 0;
	            }
	        }
	    }

	    this.remaining = this.b_height*this.b_width;
    }
  },
  mounted(){
      this.initBoard();

      this.assignBombs();
      //this.assignNumbers();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

img {
  width: 250px;
}

.field_br {
   content: " ";
}

</style>
