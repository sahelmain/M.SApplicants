// Type declarations for topojson-client
declare module 'topojson-client' {
  export function feature(topology: any, object: any): {
    type: string;
    features: any[];
  };
}
