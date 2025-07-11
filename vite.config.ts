import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
{
  "expo": {
    "name": "Animal Disease App",
    "slug": "animal-disease-app",
    "version": "1.0.0",
    "platforms": ["android"],
    "sdkVersion": "EXPO_SDK_VERSION",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    },
    "android": {
      "package": "com.yourname.animaldiseaseapp",
      "permissions": []
    }
  }
}
