/**
 * Enhanced Yellowstone National Park Landmarks
 *
 * Based on Agent 1's landmark-enhancements.json design
 * Adapted to work with existing Landmark interface
 */

import { Landmark } from './landmarks';

/**
 * Enhanced landmark data with additional metadata from research
 */
export const enhancedYellowstoneLandmarks: Landmark[] = [
  // HIGH PROMINENCE - Must-see landmarks
  {
    id: "old-faithful",
    name: "Old Faithful",
    coordinates: [-110.828213, 44.460411],
    icon: "geyser",
    prominence: "high",
    description: "The world's most famous geyser, erupting approximately every 90 minutes",
    bio: "Old Faithful is a cone geyser in Yellowstone National Park. It was named in 1870 during the Washburn-Langford-Doane Expedition and was the first geyser in the park to be named. It is one of the most predictable geographical features on Earth, erupting almost every 90 minutes with eruptions lasting 1.5 to 5 minutes and reaching heights of 106-184 feet. The geyser, along with the rest of Yellowstone National Park, is managed by the National Park Service.",
    price: 150
  },
  {
    id: "grand-prismatic",
    name: "Grand Prismatic Spring",
    coordinates: [-110.838244, 44.525114],
    icon: "spring",
    prominence: "high",
    description: "Largest hot spring in the US, third-largest in the world. Famous for rainbow colors",
    bio: "The Grand Prismatic Spring is the largest hot spring in the United States at 370 feet in diameter and over 160 feet deep, making it the third largest in the world. Located in the Midway Geyser Basin, the vivid colors in the spring are the result of microbial mats around the edges of the mineral-rich water. The deep blue color of the water in the center is due to the intrinsic blue color of water. The colors range from deep blue in the center to bright orange and red at the edges.",
    price: 175
  },
  {
    id: "lower-falls",
    name: "Lower Falls (Grand Canyon of Yellowstone)",
    coordinates: [-110.49611, 44.71806],
    icon: "waterfall",
    prominence: "high",
    description: "308-foot waterfall in the Grand Canyon of the Yellowstone",
    bio: "The Lower Falls of the Yellowstone River plunge 308 feet into the Grand Canyon of the Yellowstone, nearly twice the height of Niagara Falls. This spectacular waterfall is one of the most iconic features of the park and is best viewed from Artist Point. The roar of the water can be heard from over a mile away, and the mist from the falls creates beautiful rainbows on sunny days. The falls mark the beginning of the Grand Canyon of the Yellowstone, a 24-mile-long canyon with walls ranging from 800 to 1,200 feet deep.",
    price: 125
  },
  {
    id: "upper-falls",
    name: "Upper Falls (Grand Canyon of Yellowstone)",
    coordinates: [-110.49972, 44.71278],
    icon: "waterfall",
    prominence: "medium",
    description: "109-foot waterfall upstream from Lower Falls",
    bio: "The Upper Falls of the Yellowstone River drop 109 feet, making them smaller than the Lower Falls but still an impressive sight. The falls are best viewed from Uncle Tom's Trail and the Brink of the Upper Falls trail. The Upper Falls mark where the Yellowstone River begins its dramatic descent into the Grand Canyon. While less famous than the Lower Falls, they offer excellent photo opportunities and are more accessible to visitors.",
    price: 90
  },
  {
    id: "mammoth-hot-springs",
    name: "Mammoth Hot Springs",
    coordinates: [-110.712155, 44.9668798],
    icon: "spring",
    prominence: "high",
    description: "Stunning travertine terraces formed by mineral-rich hot springs",
    bio: "Mammoth Hot Springs is a large complex of hot springs on a hill of travertine in Yellowstone National Park. The hot springs have been depositing travertine for thousands of years, creating intricate terraces that are constantly changing. The travertine terraces grow at a rate of up to 8 inches per year as water from underground hot springs cools and deposits calcium carbonate. The area features both Upper and Lower Terraces, with colorful thermophiles adding brilliant hues to the white and cream-colored formations.",
    price: 140
  },
  {
    id: "norris-geyser",
    name: "Norris Geyser Basin",
    coordinates: [-110.70444, 44.72861],
    icon: "basin",
    prominence: "high",
    description: "Hottest and most dynamic geyser basin in Yellowstone",
    bio: "Norris Geyser Basin is the hottest and most changeable thermal area in Yellowstone National Park. The water here can reach temperatures of 459°F, making it one of the hottest geyser basins in the world. Home to Steamboat Geyser, the world's tallest active geyser which can shoot water over 300 feet in the air during major eruptions, Norris sits at the intersection of multiple fault lines, contributing to its dynamic and unpredictable nature. The basin features both acidic and alkaline features, creating a diverse and fascinating geothermal landscape.",
    price: 130
  },
  {
    id: "tower-fall",
    name: "Tower Fall",
    coordinates: [-110.3872186, 44.8936643],
    icon: "waterfall",
    prominence: "medium",
    description: "132-foot waterfall framed by volcanic pinnacles",
    bio: "Tower Fall drops 132 feet from volcanic pinnacles on Tower Creek into the Yellowstone River canyon. The waterfall was named by members of the 1870 Washburn Expedition for the tower-like rock formations that flank it. The surrounding area features towering basalt columns formed from ancient lava flows, creating a dramatic and photogenic landscape. The fall is easily accessible from a viewing platform near the parking area, making it one of the most visited waterfalls in the park.",
    price: 80
  },
  {
    id: "yellowstone-lake",
    name: "Yellowstone Lake",
    coordinates: [-110.3667, 44.4667],
    icon: "lake",
    prominence: "high",
    description: "Largest high-elevation lake in North America at 7,733 feet",
    bio: "Yellowstone Lake is the largest body of water in Yellowstone National Park and the largest high-elevation lake in North America, covering 136 square miles with 110 miles of shoreline. At 7,733 feet above sea level, the lake is up to 400 feet deep and remains frozen from late December through May or early June. The lake is home to native Yellowstone cutthroat trout and provides crucial habitat for numerous bird species including osprey, pelicans, and trumpeter swans. Hydrothermal activity on the lake bottom creates unique underwater geothermal features.",
    price: 120
  },
  {
    id: "artist-point",
    name: "Artist Point",
    coordinates: [-110.479766, 44.720183],
    icon: "canyon",
    prominence: "high",
    description: "Iconic viewpoint overlooking Lower Falls and the Grand Canyon",
    bio: "Artist Point is one of the most photographed viewpoints in Yellowstone National Park, offering spectacular views of the Lower Falls and the Grand Canyon of the Yellowstone. The viewpoint is named for the belief that painter Thomas Moran sketched the falls from this location, though this has been disputed. The vista showcases the brilliant yellows, oranges, and reds of the canyon walls, created by hydrothermal alteration of rhyolitic rocks. On sunny days, rainbows often form in the mist from the falls.",
    price: 100
  },
  {
    id: "lamar-valley",
    name: "Lamar Valley",
    coordinates: [-110.2, 44.9],
    icon: "basin",
    prominence: "high",
    description: "America's Serengeti - premier wildlife viewing area with bison, wolves, and bears",
    bio: "Lamar Valley is often called the 'Serengeti of North America' due to its abundant wildlife populations. This broad, beautiful valley is home to large herds of bison (often numbering in the hundreds), elk, pronghorn antelope, and is one of the best places in the world to see wolves in the wild. The Lamar Canyon and Junction Butte wolf packs frequently hunt here. Grizzly bears and black bears are also commonly spotted, along with coyotes, badgers, and numerous bird species. The valley's open landscape makes it ideal for wildlife watching, especially during dawn and dusk.",
    price: 110
  },
  {
    id: "hayden-valley",
    name: "Hayden Valley",
    coordinates: [-110.48, 44.65],
    icon: "basin",
    prominence: "high",
    description: "Broad valley with abundant wildlife including bison herds and grizzly bears",
    bio: "Hayden Valley is a broad, expansive valley that once lay beneath Yellowstone Lake. Today it provides crucial habitat for massive bison herds, grizzly bears, elk, and numerous bird species including sandhill cranes and great blue herons. The valley's fine glacial sediments don't support tree growth, creating perfect open grassland for wildlife viewing. The Yellowstone River meanders through the valley, providing additional habitat for waterfowl, otters, and fish. Hayden Valley is considered one of the best wildlife watching areas in the park, especially during spring and early summer.",
    price: 95
  },
  {
    id: "west-thumb",
    name: "West Thumb Geyser Basin",
    coordinates: [-110.575, 44.416],
    icon: "basin",
    prominence: "medium",
    description: "Geothermal features on the shore of Yellowstone Lake",
    bio: "West Thumb Geyser Basin is located along the western shore of Yellowstone Lake and is named for its shape, which resembles a human thumb. This thermal area features hot springs, geysers, and mud pots that extend right into the cold waters of the lake, creating a unique juxtaposition of geothermal heat and frigid lake water. The basin was formed by a volcanic eruption about 174,000 years ago, creating a small caldera within the larger Yellowstone caldera. Fishing Cone is a notable feature where, historically, fishermen could catch fish and cook them in the hot spring without moving.",
    price: 85
  },
  {
    id: "mount-washburn",
    name: "Mount Washburn",
    coordinates: [-110.433, 44.798],
    icon: "mountain",
    prominence: "medium",
    description: "10,243-foot peak offering panoramic views of the park",
    bio: "Mount Washburn stands at 10,243 feet and offers some of the most spectacular panoramic views in Yellowstone. On clear days, visitors can see the Teton Range to the south, the Absaroka Range to the east, and the Gallatin Range to the north. The mountain is a remnant of a volcanic caldera and features a fire lookout tower at the summit. The area is excellent habitat for bighorn sheep during summer months, and the wildflower displays in July and August are spectacular. Two hiking trails lead to the summit, both offering stunning 360-degree views of the Yellowstone plateau.",
    price: 75
  },
  {
    id: "firehole-river",
    name: "Firehole River",
    coordinates: [-110.82, 44.52],
    icon: "spring",
    prominence: "low",
    description: "Warm river flowing through geyser basins, popular for swimming",
    bio: "The Firehole River is unique among Yellowstone's waterways due to its warm temperature, heated by the numerous geysers and hot springs it flows past in the Upper, Midway, and Lower Geyser Basins. The river's name comes from the practice of early trappers calling valleys 'holes,' thus the Firehole was the 'hole' with fire (geothermal features). Swimming is allowed in certain sections of the river, particularly the Firehole Swimming Area, where the warm water provides a refreshing contrast to the typically cold mountain streams. The river is also known for excellent fly fishing.",
    price: 60
  },
  {
    id: "roaring-mountain",
    name: "Roaring Mountain",
    coordinates: [-110.72, 44.76],
    icon: "basin",
    prominence: "low",
    description: "Acidic hydrothermal area with numerous fumaroles creating a roaring sound",
    bio: "Roaring Mountain is an acidic hydrothermal area named for the loud roaring sound created by its numerous fumaroles (steam vents) in the late 1800s. While quieter today due to changes in underground plumbing, the mountain still features active steam vents and fumaroles that have created a barren, otherworldly landscape on the mountainside. The acidic conditions prevent vegetation from growing, leaving a stark white and yellow hillside visible from the road. The area demonstrates the dynamic nature of Yellowstone's geothermal features.",
    price: 50
  }
];

/**
 * Get landmarks filtered by prominence level
 */
export function getEnhancedLandmarksByProminence(prominence: 'high' | 'medium' | 'low'): Landmark[] {
  return enhancedYellowstoneLandmarks.filter(landmark => landmark.prominence === prominence);
}

/**
 * Get all landmarks suitable for current zoom level
 */
export function getEnhancedLandmarksForZoom(zoom: number): Landmark[] {
  if (zoom >= 11) {
    return enhancedYellowstoneLandmarks;
  } else if (zoom >= 9) {
    return enhancedYellowstoneLandmarks.filter(l => l.prominence === 'high' || l.prominence === 'medium');
  } else {
    return enhancedYellowstoneLandmarks.filter(l => l.prominence === 'high');
  }
}
