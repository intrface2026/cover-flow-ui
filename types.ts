export interface Cover {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
}