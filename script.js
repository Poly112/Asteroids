addEventListener('load', () => {
  const numberOfAsteroid = 50;
  let asteroidArray = [];

  class Earth {
    constructor() {
      this.radius = 100;
      this.width = this.radius * 2
      this.height = this.radius * 2
    }

    draw() {
      const earth = document.createElement('div');
      earth.setAttribute('style', `width: ${this.width}px; height: ${this.height}px; border-radius: 50%; transform: translate(${window.innerWidth / 4}px , ${window.innerHeight / 4}px); background-color: green; position: absolute;`);
      document.body.appendChild(earth)
    }
  }


  const earth = new Earth();

  class Asteroids {
    constructor() {
      this.density = Math.random() * 150 + 50;
      this.width = Math.random() * 5 + 2;
      this.x = Math.random() * window.innerWidth / 2;
      this.y = Math.random() * window.innerHeight / 2;
      this.randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, `0`)}`;
    }
    draw() {
      const asteroid = document.createElement('p');
      asteroid.setAttribute('style', `width: ${this.width}px; height: ${this.width}px; border-radius: 50%; top: ${this.y}px; left: ${this.x}px; position: absolute; background-color: ${this.randomColor};`);
      document.body.appendChild(asteroid);
    }
    update() {
      const earthPosition = document.querySelector('div').getBoundingClientRect();
      earth.x = earthPosition.x + earth.radius;
      earth.y = earthPosition.y + earth.radius;
      const dx = earth.x - this.x;
      const dy = earth.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = window.innerWidth / 2;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;
      this.x += directionX;
      this.y += directionY;
    }
  }

  function init() {
    for (let i = 0; i < numberOfAsteroid; i++) {
      asteroidArray.push(new Asteroids)
    }
  }
  init();



  function animate() {
    earth.draw();
    for (let i = 0; i < asteroidArray.length; i++) {
      asteroidArray[i].draw();
      asteroidArray[i].update();
    }
    requestAnimationFrame(animate)
  }
  animate()
})