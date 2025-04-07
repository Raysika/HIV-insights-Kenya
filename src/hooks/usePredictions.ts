// src/hooks/usePredictions.ts
import { useEffect, useState } from "react";

type Prediction = {
  [key: string]: any;
};

type Metrics = {
  [key: string]: number;
};

type MapType = {
  [key: string]: string;
};

type UsePredictionsResult = {
  predictions: Prediction[];
  metrics: Metrics | null;
  regionMap: MapType;
  levelMap: MapType;
  loading: boolean;
  error: string | null;
};

export const usePredictions = (): UsePredictionsResult => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [regionMap, setRegionMap] = useState<MapType>({});
  const [levelMap, setLevelMap] = useState<MapType>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await fetch("http://localhost:8000/predictions");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setPredictions(data.predictions);
        setMetrics(data.metrics);
        setRegionMap(data.region_map);
        setLevelMap(data.level_map);
      } catch (err: any) {
        setError(err.message || "Failed to fetch predictions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  return { predictions, metrics, regionMap, levelMap, loading, error };
};
