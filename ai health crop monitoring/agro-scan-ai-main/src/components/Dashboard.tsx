import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Upload, History, Brain, TrendingUp } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { PredictionResults, Prediction } from './PredictionResults';
import { HistoryView, HistoryItem } from './HistoryView';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockPredictions: Prediction[] = [
  {
    disease: "Tomato Late Blight",
    confidence: 94,
    severity: "high",
    description: "A serious fungal disease that can destroy entire crops rapidly in favorable conditions.",
    recommendations: [
      "Apply copper-based fungicide immediately",
      "Remove and destroy affected plant parts",
      "Improve air circulation around plants",
      "Avoid overhead watering"
    ]
  },
  {
    disease: "Tomato Early Blight",
    confidence: 78,
    severity: "medium",
    description: "Common fungal disease causing dark spots on leaves and stems.",
    recommendations: [
      "Apply preventive fungicide spray",
      "Ensure proper plant spacing",
      "Water at soil level to keep leaves dry"
    ]
  },
  {
    disease: "Healthy Plant",
    confidence: 65,
    severity: "low",
    description: "No significant disease detected. Plant appears healthy.",
    recommendations: [
      "Continue regular monitoring",
      "Maintain proper watering schedule",
      "Apply balanced fertilizer as needed"
    ]
  }
];

export const Dashboard = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPredictions, setCurrentPredictions] = useState<Prediction[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const { toast } = useToast();

  const handleAnalyzeImages = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setActiveTab('results');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Use first image for display
    const imageUrl = URL.createObjectURL(selectedImages[0]);
    setCurrentImageUrl(imageUrl);
    setCurrentPredictions(mockPredictions);

    // Add to history
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      imageUrl,
      predictions: mockPredictions,
      timestamp: new Date(),
      fileName: selectedImages[0].name
    };

    setHistory(prev => [newHistoryItem, ...prev]);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete",
      description: `Analyzed ${selectedImages.length} image(s) successfully.`,
    });
  };

  const handleViewHistoryDetails = (item: HistoryItem) => {
    setCurrentImageUrl(item.imageUrl);
    setCurrentPredictions(item.predictions);
    setActiveTab('results');
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item deleted",
      description: "Analysis history item has been removed.",
    });
  };

  const stats = [
    {
      label: "Total Analyses",
      value: history.length,
      icon: Brain,
      color: "text-primary"
    },
    {
      label: "Images Processed",
      value: history.length,
      icon: Upload,
      color: "text-success"
    },
    {
      label: "Avg Confidence",
      value: history.length > 0 ? 
        Math.round(history.reduce((acc, item) => acc + item.predictions[0].confidence, 0) / history.length) + '%' : 
        '0%',
      icon: TrendingUp,
      color: "text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Crop Health Monitor</h1>
                <p className="text-sm text-muted-foreground">Early disease detection for healthier crops</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card hover:shadow-card transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload & Analyze
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <ImageUpload
              selectedImages={selectedImages}
              onImagesSelected={setSelectedImages}
              onRemoveImage={(index) => {
                setSelectedImages(prev => prev.filter((_, i) => i !== index));
              }}
            />
            
            {selectedImages.length > 0 && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleAnalyzeImages}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  disabled={isAnalyzing}
                >
                  <Brain className="w-5 h-5 mr-2" />
                  {isAnalyzing ? 'Analyzing...' : `Analyze ${selectedImages.length} Image${selectedImages.length !== 1 ? 's' : ''}`}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="results">
            <PredictionResults
              predictions={currentPredictions}
              imageUrl={currentImageUrl}
              isLoading={isAnalyzing}
            />
          </TabsContent>

          <TabsContent value="history">
            <HistoryView
              history={history}
              onViewDetails={handleViewHistoryDetails}
              onDeleteItem={handleDeleteHistoryItem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};