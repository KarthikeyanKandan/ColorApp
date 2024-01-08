console.clear();

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 144;
const currentFrame1 = index => (
  `100${(index + 1).toString()}.png`
);
const currentFrame2 = index => (
  `000${(index + 1).toString()}.png`
);

const images1 = []
const images2 = []
const airpods1 = {
  frame: 0
};
const airpods2 = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `img/${currentFrame1(i)}`;
  images1.push(img);
}
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `img/${currentFrame2(i)}`;
  images2.push(img);
}

gsap.to(airpods1, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});
gsap.to(airpods2, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images1[0].onload = render;
images2[0].onload = render;


function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Get the dimensions of the first set of images
  const imgWidth1 = images1[airpods1.frame].width;
  const imgHeight1 = images1[airpods1.frame].height;

  // Get the dimensions of the second set of images
  const imgWidth2 = images2[airpods2.frame].width;
  const imgHeight2 = images2[airpods2.frame].height;

  // Calculate the position to center the first set of images
  const x1 = (canvas.width - imgWidth1) / 2;
  const y1 = (canvas.height - imgHeight1) / 2;

  // Calculate the position to center the second set of images
  const x2 = (canvas.width - imgWidth2) / 2;
  const y2 = (canvas.height - imgHeight2) / 2;

  // Draw the first set of images
  context.drawImage(images1[airpods1.frame], x1, y1, imgWidth1, imgHeight1);

  // Draw the second set of images, potentially adjusting the position based on your desired overlap
  context.drawImage(images2[airpods2.frame], x2, y2, imgWidth2, imgHeight2);
}