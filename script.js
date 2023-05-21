const grid=document.querySelector(".grid");
const doodler=document.createElement("div");
const platfrorms=document.querySelector(".platform")
//this two axises willl provide movement to doodler
let doodlerlesftspcae=50;
let startpoint=150
let doodlerbottomtspcae=startpoint
let uptimer;
let downtimer
let isgameover=false
let isjumping=true;
let isgoingleft=false
let isgoingrigth=false
let leftime
let rigthtime
let score=0;
//creating array to push newly created platform 
let platformss=[];
//creating doodler moving effect
function createdoodle(){
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodlerlesftspcae=platformss[0].left;
doodler.style.left=doodlerlesftspcae+'px'
doodler.style.bottom=doodlerbottomtspcae+'px'

}
//funcrtion for platfrorm
let platformcount=5;

class Platfrorfinal{

constructor(platbottom){
this.bottom=platbottom;
this.left=Math.random()*315
this.visual=document.createElement('div')
const visual=this.visual;
visual.classList.add('platform')
visual.style.left=this.left+'px'
visual.style.bottom=this.bottom+'px'
grid.appendChild(visual)
}
}



function creatplatform(){
//creating for loop to count platform
for(let i=0;i<platformcount;i++){
    //for calculating spaces between plateforms
let platformspace=600/platformcount;
let platbottom=100+i*platformspace
let newplatform=new Platfrorfinal(platbottom)
platformss.push(newplatform);
}


}
//function to move platform
function moveplatform(){
   if(doodlerbottomtspcae>startpoint+ 200) {
platformss.forEach(plat => {
    plat.bottom-=4;
    let visual=plat.visual
    visual.style.bottom=plat.bottom+'px'
if(plat.bottom<10){
    let firstplat=platformss[0].visual
    firstplat.classList.remove('plat')
    platformss.shift()
    score++
    let newplat=new Platfrorfinal(600)
    platformss.push(newplat)
}


});
   }
}
//fall function for doodler fall if he skips platform
function fall(){
   clearInterval(uptimer) 
   isjumping=false
   downtimer= setInterval(function(){
doodlerbottomtspcae-=5;
doodler.style.bottom=doodlerbottomtspcae+"px"
if(doodlerbottomtspcae<=0){
   gameover()
}
platformss.forEach(platform=>{
if((doodlerbottomtspcae>=platform.bottom)&&(doodlerbottomtspcae<=platform.bottom+15)&&((doodlerlesftspcae+60)>=platform.left)&&(doodlerlesftspcae<=(platform.left+85))&& !isjumping ){
startpoint=doodlerbottomtspcae
    jump()
}


})
   },30)
}
//function for game over{
function gameover(){
isgameover=true
while(grid.firstChild){
    grid.removeChild(grid.firstChild)
}
grid.innerHTML=score
clearInterval(uptimer)
clearInterval(downtimer)
clearInterval(leftime)
clearInterval(rigthtime)
}



//crfeating function jump to jump my doodler

function jump(){
    clearInterval(downtimer)
    isjumping=true
uptimer=setInterval(function (){
    doodlerbottomtspcae+=20
    doodler.style.bottom=doodlerbottomtspcae+"px"
if(doodlerbottomtspcae>startpoint+ 200){
    fall()
}

},30)

}
//function for moving





//controlll function
function controll(e){
    if(e.key==="ArrowLeft"){
        //move lefyt
        moveleft()
    }else if(e.key==="ArrowRight"){
        //move rigth
        moverigth()
    }else if(e.key==="ArrowUp"){
        //movestraigth
        movestraigth()
    }
}
function moveleft(){
    if(isgoingrigth){
        clearInterval(rigthtime)
        isgoingrigth=false
    }
    isgoingleft=true
    leftime=setInterval(function(){
        if(doodlerlesftspcae>=0){
doodlerlesftspcae-=5
doodler.style.left=doodlerlesftspcae+'px'
    } else{
        moverigth() 
     }
},20
    )

}
//function to move rigth
function moverigth(){
    if(isgoingleft){
        clearInterval(leftime)
        isgoingleft=false
    }
    isgoingrigth=true
    rigthtime=setInterval(function(){
if(doodlerlesftspcae<=340){
    doodlerlesftspcae+=5
    doodler.style.left=doodlerlesftspcae+"px"
}else
{ moveleft()}
    },20)
}
function movestraigth(){
isgoingleft=false;
isgoingrigth=false
clearInterval(rigthtime)
clearInterval(leftime)
}


//when user press start game game will exicute through this function
function start(){
    if(!isgameover){
        //creating platform
        creatplatform()
        //creating doodler
        createdoodle()
      
        //now moving platform
       setInterval( moveplatform,30)
jump()
document.addEventListener('keyup',controll)
    }

}
//creating start button for game start
start()