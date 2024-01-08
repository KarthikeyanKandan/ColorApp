console.clear();

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 144;
const currentFrame = index => (
  `000${(index + 1).toString()}.png`
);

const images = []
const airpods = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `img/${currentFrame(i)}`;
  images.push(img);
}

gsap.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;


function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Get the image dimensions
  const imgWidth = images[airpods.frame].width;
  const imgHeight = images[airpods.frame].height;

  // Calculate the position to center the image
  const x = (canvas.width - imgWidth) / 2;
  const y = (canvas.height - imgHeight) / 2;

  // Draw the image at the calculated position
  context.drawImage(images[airpods.frame], x, y, imgWidth, imgHeight);
}