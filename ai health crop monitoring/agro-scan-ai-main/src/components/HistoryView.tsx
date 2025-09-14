import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prediction } from './PredictionResults';

export interface HistoryItem {
  id: string;
  imageUrl: string;
  predictions: Prediction[];
  timestamp: Date;
  fileName: string;
}

interface HistoryViewProps {
  history: HistoryItem[];
  onViewDetails: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
}

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

export const HistoryView = ({ history, onViewDetails, onDeleteItem }: HistoryViewProps) => {
  if (history.length === 0) {
    return (
      <Card className="p-12 text-center bg-gradient-card">
        <div className="space-y-4">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">No Analysis History</h3>
            <p className="text-muted-foreground">
              Upload and analyze crop images to build your history
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Analysis History</h2>
        <span className="text-sm text-muted-foreground">
          {history.length} {history.length === 1 ? 'analysis' : 'analyses'}
        </span>
      </div>

      <div className="grid gap-4">
        {history.map((item) => {
          const topPrediction = item.predictions[0];
          
          return (
            <Card key={item.id} className="p-4 bg-gradient-card hover:shadow-card transition-all duration-300">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.fileName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground truncate">
                        {item.fileName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(item)}
                        className="h-8 px-3"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteItem(item.id)}
                        className="h-8 px-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Prediction Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {topPrediction.disease}
                      </span>
                      <Badge className={cn("text-xs", getSeverityColor(topPrediction.severity))}>
                        {topPrediction.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {topPrediction.confidence}% confidence
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {topPrediction.description}
                    </p>

                    {item.predictions.length > 1 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>+{item.predictions.length - 1} alternative</span>
                        <span>{item.predictions.length - 1 === 1 ? 'diagnosis' : 'diagnoses'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};