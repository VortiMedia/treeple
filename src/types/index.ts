import { Feature, FeatureCollection, Polygon } from 'geojson';

export type TileStatus = 'available' | 'reserved' | 'sold';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Tile {
  id: string;
  coordinates: Coordinates;
  status: TileStatus;
  geometry: Polygon;
  price: number;
  reservedAt?: string;
  soldAt?: string;
  // Donor metadata for visual patterns
  donor?: string;
  pattern?: string;
  message?: string;
  visibility?: 'public' | 'anonymous';
}

export interface GridFeature extends Feature<Polygon> {
  properties: {
    id: string;
    coordinates: Coordinates;
    status: TileStatus;
  };
}

export interface GridData extends FeatureCollection<Polygon> {
  features: GridFeature[];
}

export interface BoundingBox {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

export interface MapConfig {
  style: string;
  center: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
  maxBounds: [[number, number], [number, number]];
}

export interface SeedData {
  [tileId: string]: {
    status: 'reserved' | 'sold';
    reservedAt?: string;
    soldAt?: string;
    price?: number;
    donor?: string;
    pattern?: string;
    message?: string;
    visibility?: 'public' | 'anonymous';
  };
}

export interface User {
  email: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}
