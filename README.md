# AI Crop Health Monitor 🌱

An intelligent web application that helps farmers and agricultural professionals detect crop diseases early using AI-powered image analysis. Upload crop images and receive instant diagnosis with confidence scores, severity levels, and treatment recommendations.

![AI Crop Health Monitor](https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&h=600&q=80)

## 🚀 Features

- **🖼️ Smart Image Upload**: Drag & drop or select multiple crop images
- **🧠 AI-Powered Analysis**: Advanced disease detection with confidence scoring
- **📊 Severity Assessment**: Low, medium, and high severity level indicators
- **💡 Treatment Recommendations**: Actionable advice for each diagnosis
- **📈 Analysis History**: Track past diagnoses and monitor trends
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean, agricultural-themed interface with smooth animations

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom agricultural design system
- **shadcn/ui** components for consistent UI
- **Lucide React** for beautiful icons
- **React Router** for navigation

### Backend Architecture (Ready for Integration)
The frontend is designed to easily integrate with:
- **Python FastAPI** backend
- **TensorFlow/Keras** for AI model inference
- **SQLite** database for history storage
- **Docker** containerization support

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-crop-health-monitor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── ImageUpload.tsx  # Image upload and preview
│   ├── PredictionResults.tsx  # AI analysis results
│   └── HistoryView.tsx  # Analysis history
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── index.css           # Design system and global styles
```

## 🎨 Design System

The application uses a carefully crafted agricultural design system featuring:

- **Color Palette**: Earth tones, forest greens, and natural browns
- **Typography**: Clean, readable fonts optimized for data presentation
- **Components**: Custom-styled shadcn/ui components with agricultural themes
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🔬 AI Model Integration

### Current Status
The frontend includes mock data and simulated AI responses for demonstration. The architecture is designed for easy integration with real AI models.

### Integration Points
- **Image preprocessing**: Automatic resizing and format conversion
- **API endpoints**: RESTful interface ready for backend connection
- **Error handling**: Comprehensive error states and user feedback
- **Loading states**: Smooth loading animations during analysis

### Supported Models
Designed to work with:
- MobileNetV2 fine-tuned on PlantVillage dataset
- EfficientNet for crop disease classification
- Custom CNN models for specific crop types

## 📊 Sample Predictions

The application currently demonstrates these disease categories:

- **Tomato Late Blight** (High severity)
- **Tomato Early Blight** (Medium severity)
- **Healthy Plant** (Low severity)
- **Bacterial Spot** (Various severities)
- **Leaf Curl** (Medium severity)

## 🚀 Deployment


### Alternative Deployment Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Enable in repository settings

## 🔮 Future Enhancements

- [ ] Real AI model integration with TensorFlow.js
- [ ] Offline analysis capabilities
- [ ] Multi-language support
- [ ] Advanced filtering and search in history
- [ ] Export analysis reports (PDF/CSV)
- [ ] Real-time collaboration features
- [ ] Mobile app development
- [ ] Integration with agricultural databases

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PlantVillage Dataset** for disease classification research
- **shadcn/ui** for the beautiful component library
- **Lucide** for the comprehensive icon set
- **Unsplash** for high-quality agricultural imagery

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for farmers and agricultural professionals worldwide** 🌾
