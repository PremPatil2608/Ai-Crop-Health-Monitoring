import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, XCircle, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Prediction {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

interface PredictionResultsProps {
  predictions: Prediction[];
  imageUrl: string;
  isLoading: boolean;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'low':
      return <CheckCircle className="w-4 h-4" />;
    case 'medium':
      return <AlertTriangle className="w-4 h-4" />;
    case 'high':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Leaf className="w-4 h-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'bg-severity-low text-white';
    case 'medium':
      return 'bg-severity-medium text-white';
    case 'high':
      return 'bg-severity-high text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const PredictionResults = ({ predictions, imageUrl, isLoading }: PredictionResultsProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-card">
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-2 bg-muted rounded w-full mb-4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (predictions.length === 0) {
    return null;
  }

  const topPrediction = predictions[0];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Display */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Analyzed Image</h3>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={imageUrl}
                alt="Analyzed crop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Primary Result */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Primary Diagnosis</h3>
              <Badge className={cn("flex items-center gap-1", getSeverityColor(topPrediction.severity))}>
                {getSeverityIcon(topPrediction.severity)}
                {topPrediction.severity.toUpperCase()} SEVERITY
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {topPrediction.disease}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium">{topPrediction.confidence}%</span>
                  </div>
                  <Progress value={topPrediction.confidence} className="h-2" />
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {topPrediction.description}
                </p>
              </div>

              <div>
                <h5 className="font-medium text-foreground mb-2">Recommendations:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {topPrediction.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Alternative Predictions */}
      {predictions.length > 1 && (
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Alternative Diagnoses</h3>
          <div className="space-y-3">
            {predictions.slice(1).map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-foreground">{prediction.disease}</h4>
                    <Badge variant="outline" className={cn("text-xs", getSeverityColor(prediction.severity))}>
                      {prediction.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {prediction.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <span className="text-sm font-medium">{prediction.confidence}%</span>
                  <Progress value={prediction.confidence} className="h-1 w-20 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};