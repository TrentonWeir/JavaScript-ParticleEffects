const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

//handle mouse
const mouse = {
  x:null,
  y:null,
  radius: 250
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  //console.log(mouse.x,mouse.y);
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('A', 0, 30);
/*Creates rectange for visual area
ctx.strokeStyle = 'white';
ctx.strokeRect(0, 0, 100, 100);*/
const data = ctx.getImageData(0, 0, 100, 100);


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 200) + 3;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update(){
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) /maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    //tells pixels what to do when mouse passes
    if (distance < mouse.radius){
      this.x -= directionX;
      this.y -= directionY;
    }else{
      if(this.x !== this.baseX){
        let dx= this.x - this.baseX
        this.x -= dx/10;
      }
      if(this.x !== this.baseY){
        let dy = this.y -this.baseY;
        this.y -=dy/10;
      }
    }
  }

}

function init(){
  particleArray = [];
  for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
      for(let x = 0, x2 = textCoordinates.width: x < x2; x++){
        if(textCoordinates.data[(y * 4 * textCoordinates.width) +(x*4) + 3] > 128){
          let positionX = x;
          let positionY = y;
          particleArray.push(new Particle(positionX * 10, positionY * 10));
        }
      }
  }

/*                              original particle display with random particles
  for(let i = 0; i < 1000; i++){
    let x = Math.random() *canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x,y));
  }
*/
  //particleArray.push(new Particle(50, 50));
//  particleArray.push(new Particle(80, 50));
}
init();
//console.log(particleArray);

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < particleArray.length; i++){
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}
animate();
