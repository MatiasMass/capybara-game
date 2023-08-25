export function game(canvas) {
  // Screen
  const widthScreen = 600;
  const heightScreen = 600;

  let app = new PIXI.Application({ width: widthScreen, height: heightScreen });
  document.body.appendChild(app.view);

  app.renderer.backgroundColor = 0x061639;
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.left = "50%";
  app.renderer.view.style.top = "50%";
  app.renderer.view.style.transform = "translate3d( -50%, -50%, 0 )";

  // Background

  const background = PIXI.Sprite.from("./assets/grass.png");
  background.anchor.set(0.5);
  background.x = app.screen.width / 2;
  background.y = app.screen.height / 2;

  app.stage.addChild(background);

  // Text

  let score = 0;

  const style = new PIXI.TextStyle({
    fontFamily: "Montserrat",
    fontSize: 48,
    fill: "black",
    stroke: "#ffffff",
    strokeThickness: 4,
  });

  const myText = new PIXI.Text(`Capybaras capturados: ${score}`, style);

  app.stage.addChild(myText);

  // Sound
  const sound = new Howl({
    src: ["./assets/death-sound-effect.mp3"],
  })

  // Capybaras

  const generateRandomPosition = () => {
    const randomX = Math.floor(
      Math.random() * (positionXRange[1] - positionXRange[0] - capySize.width) +
        positionXRange[0]
    );
    const randomY = Math.floor(
      Math.random() *
        (positionYRange[1] - positionYRange[0] - capySize.height) +
        positionYRange[0]
    );
    return [randomX, randomY];
  };

  // create a list of capybaras and show them
  const capySize = { width: 100, height: 100 };
  const positionXRange = [0, widthScreen - capySize.width];
  const positionYRange = [0, heightScreen - capySize.height];
  const capybarasList = [];

  for (let i = 0; i < 10; i++) {
    const capy = PIXI.Sprite.from("./assets/capybara.png");
    const [x, y] = generateRandomPosition();
    capy.x = x;
    capy.y = y;
    const boolean = Math.random() < 0.5;
    if (boolean) {
      capy.anchor.x = 1; /* 0 = top, 0.5 = center, 1 = bottom */
      capy.scale.x *= -1;
    }
    capybarasList.push(capy);
    app.stage.addChild(capy);
  }

  const capybarasListCopy = [...capybarasList];

  app.ticker.add(gameloop);

  function handleCapybaraClick(capybara, index) {
    capybara.interactive = true; 
    capybara.buttonMode = true;

    capybara.on("pointerdown", () => {
      capybara.tint = 0xff3300;
      setTimeout(() => {
        capybarasListCopy.splice(index, 1);
        capybarasList.splice(index, 1);
        if (!capybara.destroyed) {
          sound.play();
          capybara.destroy();
          score += 1;
          myText.text = `Capybaras capturados: ${score}`;
        }
      }, 500); // 500 milisegundos (0.5 segundos)
    });
  }

  // Game loop

  function gameloop() {
    capybarasListCopy.forEach((capybara, index) => {
      handleCapybaraClick(capybara, index);
    });
  }
}
