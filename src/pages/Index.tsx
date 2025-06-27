
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Beta Ads</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">
            Welcome to Beta Ads
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience our new brand colors and seamless dark/light mode switching.
          </p>
          
          {/* Sample elements to showcase the color palette */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary">Primary Colors</h3>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Primary Button
              </button>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary">Secondary Colors</h3>
              <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
                Secondary Button
              </button>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-primary">Accent Colors</h3>
              <div className="bg-accent text-accent-foreground px-4 py-2 rounded-md">
                Accent Background
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
