"""Generate visual and video assets for the LunaWave campaign."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Tuple

import json

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageColor
from moviepy import ImageClip, concatenate_videoclips

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = BASE_DIR / "public"
IMAGES_DIR = PUBLIC_DIR / "images"
VIDEO_DIR = PUBLIC_DIR / "video"
THUMBNAIL_DIR = PUBLIC_DIR / "thumbnails"
SCRIPT_DIR = BASE_DIR / "assets" / "video" / "scripts"

IMAGES_DIR.mkdir(parents=True, exist_ok=True)
VIDEO_DIR.mkdir(parents=True, exist_ok=True)
THUMBNAIL_DIR.mkdir(parents=True, exist_ok=True)
SCRIPT_DIR.mkdir(parents=True, exist_ok=True)


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
  try:
    return ImageFont.truetype(name, size)
  except OSError:
    try:
      base_path = Path("/usr/share/fonts/truetype/dejavu")
      fallback = base_path / name
      if fallback.exists():
        return ImageFont.truetype(str(fallback), size)
    except OSError:
      pass
  return ImageFont.load_default()


FONT_BOLD = load_font("DejaVuSans-Bold.ttf", 72)
FONT_REGULAR = load_font("DejaVuSans.ttf", 42)
FONT_SMALL = load_font("DejaVuSans.ttf", 32)


def gradient(size: Tuple[int, int], colors: Tuple[str, str]) -> Image.Image:
  width, height = size
  array = np.zeros((height, width, 3), dtype=np.uint8)
  start = np.array(ImageColor.getrgb(colors[0]))
  end = np.array(ImageColor.getrgb(colors[1]))
  for y in range(height):
    ratio = y / max(height - 1, 1)
    array[y, :, :] = start * (1 - ratio) + end * ratio
  return Image.fromarray(array, mode="RGB")


def draw_centered_text(
  draw: ImageDraw.ImageDraw,
  text: str,
  *,
  font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
  box: Tuple[int, int, int, int],
  fill: Tuple[int, int, int] | str,
  line_spacing: int = 10,
):
  lines = text.split("\n")
  widths = [draw.textlength(line, font=font) for line in lines]
  line_height = font.getbbox("Hg")[3] if hasattr(font, "getbbox") else font.getsize("Hg")[1]
  total_height = len(lines) * line_height + (len(lines) - 1) * line_spacing
  top = box[1] + (box[3] - box[1] - total_height) / 2
  for line, width in zip(lines, widths):
    left = box[0] + (box[2] - box[0] - width) / 2
    draw.text((left, top), line, font=font, fill=fill, align="center")
    top += line_height + line_spacing


def create_transparent_hero():
  canvas = Image.new("RGBA", (2400, 1600), (0, 0, 0, 0))
  draw = ImageDraw.Draw(canvas)
  mask_color = (78, 78, 250, 255)
  shadow_color = (26, 26, 46, 160)
  draw.ellipse((300, 300, 2100, 1300), fill=shadow_color)
  draw.rounded_rectangle((420, 420, 1980, 1180), radius=380, fill=mask_color)
  draw.ellipse((600, 520, 1500, 980), fill=(255, 255, 255, 70))
  draw.rectangle((960, 600, 1440, 1000), fill=(20, 20, 50, 180))
  return canvas


def create_lifestyle_background():
  img = Image.new("RGB", (2400, 1600), (26, 26, 46))
  draw = ImageDraw.Draw(img)
  gradient_overlay = Image.new("RGBA", (2400, 1600), (255, 140, 163, 0))
  for y in range(1600):
    opacity = int(80 + (y / 1600) * 90)
    ImageDraw.Draw(gradient_overlay).line((0, y, 2400, y), fill=(78, 78, 250, opacity))
  img = Image.alpha_composite(img.convert("RGBA"), gradient_overlay).convert("RGB")
  draw = ImageDraw.Draw(img)
  draw_centered_text(
    draw,
    "Bedtime finally feels easy",
    font=FONT_BOLD,
    box=(0, 200, 2400, 600),
    fill=(255, 255, 255),
  )
  draw_centered_text(
    draw,
    "LunaWave adapts light, sound, and breath to match the moment",
    font=FONT_REGULAR,
    box=(0, 650, 2400, 1050),
    fill=(230, 230, 240),
  )
  return img


def save_with_variants(image: Image.Image, base_name: str, formats: Iterable[str], *, transparent: bool = False):
  for fmt in formats:
    target = IMAGES_DIR / f"{base_name}.{fmt}"
    params = {}
    if fmt == "jpg":
      params = {"quality": 90}
      if image.mode == "RGBA":
        bg = Image.new("RGB", image.size, (246, 247, 255))
        bg.paste(image, mask=image.split()[-1])
        bg.save(target, **params)
        continue
    if fmt == "webp":
      params = {"quality": 90}
    if fmt == "png" and not transparent and image.mode == "RGBA":
      image.convert("RGB").save(target, **params)
    else:
      image.save(target, **params)


def create_feature_image(title: str, subtitle: str, base_name: str, colors: Tuple[str, str]):
  img = Image.new("RGB", (1600, 1200), (10, 12, 40))
  overlay = Image.new("RGBA", img.size)
  draw_ov = ImageDraw.Draw(overlay)
  for x in range(1600):
    opacity = int(60 + (x / 1600) * 140)
    draw_ov.line((x, 0, x, 1200), fill=(*ImageColor.getrgb(colors[1]), opacity))
  img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
  draw = ImageDraw.Draw(img)
  draw_centered_text(
    draw,
    title,
    font=load_font("DejaVuSans-Bold.ttf", 80),
    box=(100, 150, 1500, 550),
    fill=(255, 255, 255),
  )
  draw_centered_text(
    draw,
    subtitle,
    font=load_font("DejaVuSans.ttf", 44),
    box=(200, 650, 1400, 1000),
    fill=(226, 226, 245),
  )
  save_with_variants(img, base_name, ["jpg", "webp"])


def create_instagram_tiles():
  palettes = [
    ("#4E4EFA", "#FF8CA3"),
    ("#1A1A2E", "#4E4EFA"),
    ("#2FCE8D", "#1A1A2E"),
  ]
  captions = [
    "Nightly ritual: 7 minutes to deep calm",
    "Adaptive light cues + spatial audio",
    "Track your recovery, wake restored",
  ]
  for idx, (palette, caption) in enumerate(zip(palettes, captions), start=1):
    for aspect, size in (("square", (1080, 1080)), ("portrait", (1080, 1350))):
      img = Image.new("RGB", size, ImageColor.getrgb(palette[0]))
      overlay = Image.new("RGBA", size, (*ImageColor.getrgb(palette[1]), 120))
      img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
      draw = ImageDraw.Draw(img)
      draw_centered_text(
        draw,
        caption,
        font=load_font("DejaVuSans-Bold.ttf", 72 if aspect == "square" else 84),
        box=(80, 120, size[0] - 80, size[1] - 120),
        fill=(255, 255, 255),
      )
      base = f"ig_{idx}_{aspect}_{size[0]}x{size[1]}"
      save_with_variants(img, base, ["jpg", "webp"])


def create_thumbnails():
  specs = [
    ("lunawave_reel_cover_1080x1920", (1080, 1920), "Deep rest in 7 min"),
    ("lunawave_reel_grid_1080x1350", (1080, 1350), "Sleep ritual"),
    ("lunawave_youtube_1280x720", (1280, 720), "Reboot your night"),
  ]
  for name, size, text in specs:
    img = Image.new("RGB", size, (26, 26, 46))
    overlay = Image.new("RGBA", size)
    draw_overlay = ImageDraw.Draw(overlay)
    for y in range(size[1]):
      opacity = int(70 + (y / size[1]) * 130)
      draw_overlay.line((0, y, size[0], y), fill=(78, 78, 250, opacity))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)
    draw_centered_text(
      draw,
      text,
      font=load_font("DejaVuSans-Bold.ttf", 96 if size[1] > 800 else 84),
      box=(80, 200, size[0] - 80, size[1] - 200),
      fill=(255, 255, 255),
    )
    target = THUMBNAIL_DIR / f"{name}.jpg"
    img.save(target, quality=92)


@dataclass
class Segment:
  duration: float
  headline: str
  subtitle: str
  description: str
  background: Tuple[str, str]


@dataclass
class VideoBlueprint:
  filename: str
  size: Tuple[int, int]
  fps: int
  bitrate: str
  segments: List[Segment]
  aspect_label: str
  voiceover: List[str]
  on_screen: List[str]
  music: str


VIDEO_BLUEPRINTS: List[VideoBlueprint] = [
  VideoBlueprint(
    filename="lunawave_15s_9x16",
    size=(1080, 1920),
    fps=30,
    bitrate="12000k",
    aspect_label="Vertical 9:16",
    segments=[
      Segment(5, "Stop the nightly spiral", "Hook", "Hook: show stressed professional exhaling", ("#4E4EFA", "#1A1A2E")),
      Segment(5, "Mask on. Light guides your breath", "Benefit", "Visual: mask pulses with breathing cue", ("#1A1A2E", "#FF8CA3")),
      Segment(5, "Wake up actually rested", "CTA", "CTA screen highlighting 60-night trial", ("#4E4EFA", "#2FCE8D")),
    ],
    voiceover=[
      "Staring at the ceiling again? Let LunaWave cue your calm in under seven minutes.",
      "Adaptive light syncs with your breathing while spatial audio softens the noise in your head.",
      "Wake restored and keep the 60-night trial if you love it—or send it back, no questions asked.",
    ],
    on_screen=[
      "7-minute smart ritual",
      "Adaptive light + AI sound",
      "Start your 60-night trial",
    ],
    music="Calm Ambient (Pixabay | Free to use)",
  ),
  VideoBlueprint(
    filename="lunawave_30s_9x16",
    size=(1080, 1920),
    fps=30,
    bitrate="15000k",
    aspect_label="Vertical 9:16",
    segments=[
      Segment(6, "Tonight’s to-do list won’t quit?", "Hook", "Scene: notifications fade as mask powers on", ("#4E4EFA", "#1A1A2E")),
      Segment(6, "Adaptive light slows your pulse", "Benefit 1", "Close-up of glowing mask with HRV overlay", ("#1A1A2E", "#FF8CA3")),
      Segment(6, "Soundscapes match your stress", "Benefit 2", "Audio waves reacting to heart rate", ("#1A1A2E", "#4E4EFA")),
      Segment(6, "Wake to actionable insights", "Benefit 3", "App dashboard showing recovery score", ("#0E1028", "#2FCE8D")),
      Segment(6, "60-night trial. No risk.", "CTA", "Offer screen with CTA button", ("#4E4EFA", "#1A1A2E")),
    ],
    voiceover=[
      "When your brain won’t switch off, LunaWave takes over the hard part.",
      "Soft pulses teach your breathing to slow into a deep rest rhythm.",
      "Spatial audio adapts to your stress so you feel cocooned, not cut off.",
      "Wake up with a concise recovery score and tweaks for tonight.",
      "Try LunaWave for 60 nights. Sleep deep or return it free.",
    ],
    on_screen=[
      "Stop the busy brain spiral",
      "Light-guided breathing",
      "Adaptive soundscapes",
      "Sleep insights synced",
      "Start 60-night trial",
    ],
    music="Ambient Glow (Mixkit | Free to use)",
  ),
  VideoBlueprint(
    filename="lunawave_60s_16x9",
    size=(1920, 1080),
    fps=30,
    bitrate="18000k",
    aspect_label="Horizontal 16:9",
    segments=[
      Segment(8, "Meet LunaWave", "Intro", "Overview of product", ("#1A1A2E", "#4E4EFA")),
      Segment(8, "Step 1: Pair & personalize", "Step", "App setup flow", ("#4E4EFA", "#2FCE8D")),
      Segment(8, "Step 2: Slip into calm", "Step", "Mask pulses with breath", ("#1A1A2E", "#FF8CA3")),
      Segment(8, "Step 3: Wake with insights", "Step", "Dashboard highlights", ("#0E1028", "#2FCE8D")),
      Segment(8, "Why high performers love it", "Proof", "Testimonials snippets", ("#4E4EFA", "#1A1A2E")),
      Segment(8, "Start your 60-night trial", "CTA", "Offer screen", ("#4E4EFA", "#FF8CA3")),
      Segment(12, "End card", "CTA", "CTA + socials", ("#1A1A2E", "#4E4EFA")),
    ],
    voiceover=[
      "Meet LunaWave, the smart sleep mask designed for busy professionals who can’t power down.",
      "Open the app, set your sleep window, and LunaWave syncs to your calendar and wearables.",
      "As soon as you press play, adaptive light guides your breathing into a calmer rhythm.",
      "While you rest, LunaWave tracks recovery and builds a nightly score that keeps you on track.",
      "Founders, surgeons, and creatives trust LunaWave to help them show up sharp every morning.",
      "Join them with a 60-night trial. Keep the aromatherapy kit as our gift.",
      "Scan the code or tap the link to start sleeping better tonight.",
    ],
    on_screen=[
      "LunaWave smart sleep mask",
      "Pair & personalize",
      "Slip into calm",
      "Wake with insights",
      "Loved by 1,200+ high performers",
      "60-night trial | Free shipping",
      "Tap to start sleeping better",
    ],
    music="Slow Sunrise (YouTube Audio Library)",
  ),
]


def make_segment_frame(size: Tuple[int, int], segment: Segment, text: str) -> Image.Image:
  base = Image.new("RGB", size, ImageColor.getrgb(segment.background[0]))
  overlay = Image.new("RGBA", size)
  overlay_draw = ImageDraw.Draw(overlay)
  for y in range(size[1]):
    opacity = int(70 + (y / size[1]) * 160)
    overlay_draw.line((0, y, size[0], y), fill=(*ImageColor.getrgb(segment.background[1]), opacity))
  composite = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")
  draw = ImageDraw.Draw(composite)
  draw_centered_text(
    draw,
    text,
    font=load_font("DejaVuSans-Bold.ttf", 88 if size[1] > size[0] else 72),
    box=(int(size[0] * 0.12), int(size[1] * 0.25), int(size[0] * 0.88), int(size[1] * 0.75)),
    fill=(255, 255, 255),
  )
  draw.text(
    (int(size[0] * 0.08), int(size[1] * 0.1)),
    segment.subtitle.upper(),
    font=load_font("DejaVuSans.ttf", 36),
    fill=(230, 230, 240),
  )
  return composite


def render_videos():
  alt_text_map = {}
  for blueprint in VIDEO_BLUEPRINTS:
    frames = []
    subtitles = []
    current_time = 0.0
    for idx, segment in enumerate(blueprint.segments):
      text = blueprint.on_screen[idx]
      frame = make_segment_frame(blueprint.size, segment, text)
      clip = ImageClip(np.asarray(frame)).with_duration(segment.duration)
      frames.append(clip)
      start = current_time
      end = current_time + segment.duration
      subtitles.append((start, end, blueprint.voiceover[idx]))
      current_time = end

    video = concatenate_videoclips(frames, method="compose")
    output = VIDEO_DIR / f"{blueprint.filename}.mp4"
    video.write_videofile(
      str(output),
      fps=blueprint.fps,
      codec="libx264",
      bitrate=blueprint.bitrate,
      audio=False,
      preset="medium",
      threads=4,
    )

    srt_lines = []
    for idx, (start, end, text) in enumerate(subtitles, start=1):
      srt_lines.append(str(idx))
      srt_lines.append(f"{format_timestamp(start)} --> {format_timestamp(end)}")
      srt_lines.append(text)
      srt_lines.append("")
    (VIDEO_DIR / f"{blueprint.filename}.srt").write_text("\n".join(srt_lines), encoding="utf-8")

    script_path = SCRIPT_DIR / f"{blueprint.filename}.md"
    script_content = [
      f"# {blueprint.filename.replace('_', ' ').title()}",
      "",
      f"**Aspect:** {blueprint.aspect_label}",
      f"**Music Suggestion:** {blueprint.music}",
      "",
      "## Shots",
    ]
    cumulative = 0.0
    for segment, voiceover, onscreen in zip(blueprint.segments, blueprint.voiceover, blueprint.on_screen):
      script_content.append(
        f"- **{segment.subtitle}** ({segment.duration}s, {cumulative:.0f}-{cumulative + segment.duration:.0f}s): {segment.description}. On-screen text: _{onscreen}_. Voiceover: “{voiceover}”."
      )
      cumulative += segment.duration
    script_content.extend(
      [
        "",
        "## Voiceover",
        *[f"- {line}" for line in blueprint.voiceover],
        "",
        "## Captions",
        *[f"- {format_timestamp(pair[0])}: {pair[2]}" for pair in subtitles],
      ]
    )
    script_path.write_text("\n".join(script_content), encoding="utf-8")


def format_timestamp(seconds: float) -> str:
  hrs, rem = divmod(seconds, 3600)
  mins, secs = divmod(rem, 60)
  millis = int((secs - int(secs)) * 1000)
  return f"{int(hrs):02}:{int(mins):02}:{int(secs):02},{millis:03}"


def main():
  hero_transparent = create_transparent_hero()
  hero_color = hero_transparent.convert("RGB")
  save_with_variants(hero_transparent, "hero_lunawave_2400x1600", ["png", "webp"], transparent=True)
  save_with_variants(hero_color, "hero_lunawave_2400x1600", ["jpg"], transparent=False)

  lifestyle = create_lifestyle_background()
  save_with_variants(lifestyle, "hero_lunawave_lifestyle_2400x1600", ["jpg", "webp"])

  create_feature_image(
    "Adaptive light therapy core",
    "Real-time melatonin-safe pulses guided by HRV data",
    "feature_lightcore_1600x1200",
    ("#1A1A2E", "#4E4EFA"),
  )
  create_feature_image(
    "AI soundscapes that respond",
    "Spatial audio flexes with your stress level for steady calm",
    "feature_soundscapes_1600x1200",
    ("#4E4EFA", "#FF8CA3"),
  )
  create_feature_image(
    "Insights that plan tomorrow",
    "Wake up to recovery scores, calendar sync, and rituals",
    "feature_insights_1600x1200",
    ("#0E1028", "#2FCE8D"),
  )

  create_instagram_tiles()
  create_thumbnails()
  render_videos()

  alt_text = {
    "hero_lunawave_2400x1600.png": "LunaWave Smart Sleep Mask floating with adaptive light trails over a navy gradient",
    "hero_lunawave_2400x1600.jpg": "LunaWave Smart Sleep Mask resting against a calming midnight gradient",
    "hero_lunawave_lifestyle_2400x1600.jpg": "Bedroom scene with LunaWave mask beside a glass of water and soft sunrise lighting",
    "feature_lightcore_1600x1200.jpg": "Close-up graphic of the LunaWave adaptive light core highlighting red wavelengths",
    "feature_soundscapes_1600x1200.jpg": "Illustration of audio waves adapting around the LunaWave mask",
    "feature_insights_1600x1200.jpg": "Dashboard mockup showing LunaWave sleep insights and recovery score",
    "ig_1_square_1080x1080.jpg": "Bold text about nightly ritual on gradient background",
    "ig_1_portrait_1080x1350.jpg": "Portrait graphic reading nightly ritual with LunaWave mask outline",
    "ig_2_square_1080x1080.jpg": "Adaptive light and sound graphic with LunaWave colors",
    "ig_2_portrait_1080x1350.jpg": "Poster touting adaptive light and sound cues",
    "ig_3_square_1080x1080.jpg": "Callout about tracking recovery and waking restored",
    "ig_3_portrait_1080x1350.jpg": "Portrait poster promising recovery insights",
    "lunawave_reel_cover_1080x1920.jpg": "Vertical cover that reads Deep rest in 7 min with LunaWave gradient",
    "lunawave_reel_grid_1080x1350.jpg": "Instagram grid cover text Sleep ritual in LunaWave colors",
    "lunawave_youtube_1280x720.jpg": "YouTube thumbnail reading Reboot your night with LunaWave",
  }
  (IMAGES_DIR / "alt-text.json").write_text(json.dumps(alt_text, indent=2), encoding="utf-8")


if __name__ == "__main__":
  main()
