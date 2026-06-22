const WIDTH = 1200;
const HEIGHT = 630;

async function generateOGImage() {
  const sharp = (await import("sharp")).default;
  const path = await import("node:path");

  const projectsDir = path.join(__dirname, "..", "public", "projects");
  const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "app",
    "opengraph-image.png",
  );

  // Base layer: dark background with a subtle glow accent.
  const bgSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="-10%" r="70%">
          <stop offset="0%" stop-color="#1d4f5c" stop-opacity="0.55"/>
          <stop offset="50%" stop-color="#0a1a1f" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a0a"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>
    </svg>
  `;

  // Text + decorative elements layer.
  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text x="600" y="175" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif"
        font-size="92" font-weight="900"
        fill="#ffffff" letter-spacing="6">KIM YUNGJU</text>

      <text x="600" y="232" text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="26" font-weight="400"
        fill="#9ca3af" letter-spacing="8">SOFTWARE  ENGINEER</text>

      <line x1="552" y1="262" x2="648" y2="262" stroke="#5eead4" stroke-width="2"/>

      <text x="600" y="600" text-anchor="middle"
        font-family="Consolas, 'Courier New', monospace"
        font-size="18" font-weight="500"
        fill="#6b7280" letter-spacing="4">kimyungju.com</text>
    </svg>
  `;

  // Project thumbnail row: 3 mockups at ~2:1 to match the source previews,
  // equal gaps, horizontally centered.
  const thumbW = 320;
  const thumbH = 160;
  const gap = 40;
  const rowWidth = thumbW * 3 + gap * 2;
  const startX = Math.round((WIDTH - rowWidth) / 2);
  const startY = 360;

  const previews = [
    "interviewpilot-preview.png",
    "pricewise-preview.png",
    "colonial-archives-preview.png",
  ];

  const roundedMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${thumbW}" height="${thumbH}">
       <rect x="0" y="0" width="${thumbW}" height="${thumbH}" rx="14" ry="14" fill="#ffffff"/>
     </svg>`,
  );

  const composites = [{ input: Buffer.from(textSvg), top: 0, left: 0 }];

  for (let i = 0; i < previews.length; i++) {
    const thumb = await sharp(path.join(projectsDir, previews[i]))
      .resize(thumbW, thumbH, { fit: "cover", position: "centre" })
      .composite([{ input: roundedMask, blend: "dest-in" }])
      .png()
      .toBuffer();

    composites.push({
      input: thumb,
      top: startY,
      left: startX + i * (thumbW + gap),
    });
  }

  await sharp(Buffer.from(bgSvg)).composite(composites).png().toFile(outputPath);

  console.log(`Generated ${outputPath} (${WIDTH}x${HEIGHT})`);
}

generateOGImage().catch((err) => {
  console.error(err);
  process.exit(1);
});
