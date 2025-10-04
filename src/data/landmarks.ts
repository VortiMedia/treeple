/**
 * Yellowstone National Park Landmarks
 *
 * Famous geological features, geysers, and points of interest
 * Coordinates: [longitude, latitude] in WGS84
 */

export interface Landmark {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  icon: 'geyser' | 'spring' | 'lake' | 'waterfall' | 'canyon' | 'mountain' | 'basin';
  prominence: 'high' | 'medium' | 'low';
  description: string;
  bio: string; // Full bio for detail panel
  price: number; // Price in USD
}

export const yellowstoneLandmarks: Landmark[] = [
  // High Prominence - Most famous features
  {
    id: "old-faithful",
    name: "Old Faithful",
    coordinates: [-110.8280, 44.4605],
    icon: "geyser",
    prominence: "high",
    description: "World's most famous geyser",
    bio: "Old Faithful is a cone geyser in Yellowstone National Park. It was named in 1870 during the Washburn-Langford-Doane Expedition and was the first geyser in the park to be named. It is one of the most predictable geographical features on Earth, erupting almost every 90 minutes. The geyser, along with the rest of the Yellowstone National Park, is managed by the National Park Service.",
    price: 150
  },
  {
    id: "grand-prismatic",
    name: "Grand Prismatic Spring",
    coordinates: [-110.8382, 44.5252],
    icon: "spring",
    prominence: "high",
    description: "Largest hot spring in the United States",
    bio: "The Grand Prismatic Spring is the largest hot spring in the United States, and the third largest in the world. It is located in the Midway Geyser Basin. The vivid colors in the spring are the result of microbial mats around the edges of the mineral-rich water. The deep blue color of the water in the center is due to the intrinsic blue color of water, which is a result of water's selective absorption of red wavelengths of visible light.",
    price: 175
  },
  {
    id: "grand-canyon",
    name: "Grand Canyon of the Yellowstone",
    coordinates: [-110.4979, 44.7194],
    icon: "canyon",
    prominence: "high",
    description: "Spectacular canyon with Lower Falls",
    bio: "The Grand Canyon of the Yellowstone is the most breathtaking wonder in the park's Yellowstone River. The canyon is approximately 24 miles long, between 800 and 1,200 feet deep and from .25 to .75 mile wide. The Lower Falls of the Yellowstone River, at 308 feet, are nearly twice as high as Niagara Falls. The colors of the canyon are stunning, ranging from bright yellow to deep orange and red.",
    price: 125
  },
  {
    id: "yellowstone-lake",
    name: "Yellowstone Lake",
    coordinates: [-110.3717, 44.4260],
    icon: "lake",
    prominence: "high",
    description: "Largest high-altitude lake in North America",
    bio: "Yellowstone Lake is the largest body of water in Yellowstone National Park and the largest high-elevation lake in North America. At 7,732 feet above sea level, it is 20 miles long and 14 miles wide, with 141 miles of shoreline. The lake freezes over by late December and can remain frozen until late May or early June. It is home to native Yellowstone cutthroat trout and provides crucial habitat for wildlife.",
    price: 100
  },

  // Medium Prominence - Well-known features
  {
    id: "mammoth-hot-springs",
    name: "Mammoth Hot Springs",
    coordinates: [-110.7038, 44.9764],
    icon: "spring",
    prominence: "medium",
    description: "Travertine terraces and hot springs",
    bio: "Mammoth Hot Springs is a large complex of hot springs on a hill of travertine. The travertine terraces are created when water from the underground hot springs cools and deposits calcium carbonate. The terraces grow at a rate of up to 8 inches per year, creating an ever-changing landscape. The area has been used by Native Americans for thousands of years and was the first headquarters of Yellowstone National Park.",
    price: 85
  },
  {
    id: "norris-geyser",
    name: "Norris Geyser Basin",
    coordinates: [-110.7029, 44.7276],
    icon: "basin",
    prominence: "medium",
    description: "Hottest and most dynamic thermal area",
    bio: "Norris Geyser Basin is the hottest and most changeable thermal area in Yellowstone. The water here can reach 459°F, making it one of the hottest geyser basins in the world. Steamboat Geyser, located in Norris, is the world's tallest active geyser, capable of shooting water over 300 feet in the air during major eruptions. The basin sits at the intersection of multiple fault lines, contributing to its dynamic and unpredictable nature.",
    price: 90
  },
  {
    id: "lower-falls",
    name: "Lower Falls",
    coordinates: [-110.4964, 44.7200],
    icon: "waterfall",
    prominence: "medium",
    description: "308-foot waterfall",
    bio: "The Lower Falls of the Yellowstone River plunge 308 feet into the Grand Canyon of the Yellowstone, nearly twice the height of Niagara Falls. The falls are one of the most photographed features in the park, with their powerful cascade framed by the colorful canyon walls. The roar of the water can be heard from over a mile away, and the mist from the falls creates beautiful rainbows on sunny days.",
    price: 110
  },
  {
    id: "mount-washburn",
    name: "Mount Washburn",
    coordinates: [-110.4343, 44.7978],
    icon: "mountain",
    prominence: "medium",
    description: "10,243 ft peak with panoramic views",
    bio: "Mount Washburn stands at 10,243 feet and offers some of the most spectacular panoramic views in Yellowstone. On clear days, you can see the Teton Range to the south and the Absaroka Range to the east. The mountain is a remnant of a volcanic caldera and is home to bighorn sheep during summer months. The summit can be reached via hiking trails and offers 360-degree views of the entire Yellowstone plateau.",
    price: 75
  },
  {
    id: "west-thumb",
    name: "West Thumb Geyser Basin",
    coordinates: [-110.5758, 44.4161],
    icon: "basin",
    prominence: "medium",
    description: "Thermal features on Yellowstone Lake shore",
    bio: "West Thumb Geyser Basin is located along the shore of Yellowstone Lake and is named for its shape, which resembles a human thumb. This thermal area features hot springs, geysers, and mud pots that extend right into the cold waters of the lake. The basin was formed by a volcanic eruption about 174,000 years ago, creating a small caldera within the larger Yellowstone caldera. It's one of the most scenic thermal areas in the park.",
    price: 80
  },
  {
    id: "lamar-valley",
    name: "Lamar Valley",
    coordinates: [-110.2103, 44.9173],
    icon: "basin",
    prominence: "medium",
    description: "Wildlife viewing hotspot",
    bio: "Lamar Valley is often called the 'Serengeti of North America' due to its abundant wildlife. The valley is home to large herds of bison, elk, and pronghorn antelope. It's also one of the best places in the world to see wolves in the wild, as the Lamar Canyon wolf pack frequently hunts here. The valley's open landscape makes it ideal for wildlife watching, especially during dawn and dusk when animals are most active.",
    price: 95
  },

  // Low Prominence - Additional points of interest
  {
    id: "castle-geyser",
    name: "Castle Geyser",
    coordinates: [-110.8363, 44.4617],
    icon: "geyser",
    prominence: "low",
    description: "Large cone geyser in Upper Geyser Basin",
    bio: "Castle Geyser is named for its resemblance to a castle turret. It has the largest sinter cone of any geyser in the park, estimated to be between 5,000 and 15,000 years old. The geyser erupts approximately every 10-12 hours, shooting water up to 90 feet high for about 20 minutes, followed by a noisy steam phase that can last for 30-40 minutes.",
    price: 60
  },
  {
    id: "mud-volcano",
    name: "Mud Volcano",
    coordinates: [-110.4358, 44.6272],
    icon: "basin",
    prominence: "low",
    description: "Acidic thermal features",
    bio: "The Mud Volcano area features some of the most acidic thermal features in Yellowstone. Dragon's Mouth Spring and Mud Volcano itself create an otherworldly landscape of bubbling mud pots and steaming vents. The area's high acidity is due to hydrogen sulfide gas dissolving in water to form sulfuric acid, which breaks down the surrounding rock into clay.",
    price: 55
  },
  {
    id: "gibbon-falls",
    name: "Gibbon Falls",
    coordinates: [-110.7418, 44.6882],
    icon: "waterfall",
    prominence: "low",
    description: "84-foot waterfall",
    bio: "Gibbon Falls is an 84-foot waterfall on the Gibbon River. The falls drop over the edge of the Yellowstone Caldera, marking the boundary between the younger rhyolite lava flows inside the caldera and the older andesite flows outside. The waterfall is easily accessible from the road and offers beautiful photo opportunities, especially in early summer when water flow is highest.",
    price: 50
  },
  {
    id: "hayden-valley",
    name: "Hayden Valley",
    coordinates: [-110.4829, 44.6540],
    icon: "basin",
    prominence: "low",
    description: "Prime bison and wildlife habitat",
    bio: "Hayden Valley is a broad, expansive valley that once lay beneath Yellowstone Lake. Today it provides crucial habitat for bison, grizzly bears, elk, and numerous bird species. The valley's fine glacial sediments don't support tree growth, creating the perfect open grassland for wildlife viewing. The Yellowstone River meanders through the valley, providing additional habitat for waterfowl and other animals.",
    price: 65
  },
  {
    id: "tower-fall",
    name: "Tower Fall",
    coordinates: [-110.3897, 44.8915],
    icon: "waterfall",
    prominence: "low",
    description: "132-foot waterfall near Tower Junction",
    bio: "Tower Fall drops 132 feet from volcanic pinnacles into the Yellowstone River canyon. The waterfall was named by members of the 1870 Washburn Expedition for the tower-like rock formations that flank it. The surrounding area features towering basalt columns formed from ancient lava flows, creating a dramatic and photogenic landscape.",
    price: 55
  }
];

/**
 * Get landmarks filtered by prominence level
 */
export function getLandmarksByProminence(prominence: 'high' | 'medium' | 'low'): Landmark[] {
  return yellowstoneLandmarks.filter(landmark => landmark.prominence === prominence);
}

/**
 * Get all landmarks suitable for current zoom level
 * High zoom: show all landmarks
 * Medium zoom: show high and medium prominence
 * Low zoom: show only high prominence
 */
export function getLandmarksForZoom(zoom: number): Landmark[] {
  if (zoom >= 11) {
    return yellowstoneLandmarks;
  } else if (zoom >= 9.5) {
    return yellowstoneLandmarks.filter(l => l.prominence === 'high' || l.prominence === 'medium');
  } else {
    return yellowstoneLandmarks.filter(l => l.prominence === 'high');
  }
}

/**
 * Check if a landmark's coordinates fall within a polygon
 * Uses simple bounding box check for performance
 */
function isPointInPolygon(point: [number, number], polygon: number[][][]): boolean {
  if (!polygon || polygon.length === 0 || !polygon[0]) return false;

  const [lng, lat] = point;
  const ring = polygon[0]; // Outer ring of the polygon

  // Simple point-in-polygon test using ray casting algorithm
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];

    const intersect = ((yi > lat) !== (yj > lat))
        && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * Get landmarks within a given tile's polygon boundary
 */
export function getLandmarksInTile(tileGeometry: any): Landmark[] {
  if (!tileGeometry || tileGeometry.type !== 'Polygon') {
    return [];
  }

  return yellowstoneLandmarks.filter(landmark =>
    isPointInPolygon(landmark.coordinates, tileGeometry.coordinates)
  );
}
