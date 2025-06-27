
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with theme toggle */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Your Website</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Welcome to Your Site</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Experience our beautiful design in both light and dark themes
          </p>
          <Button className="mr-4">Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>

        {/* Sample content to showcase the theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Feature One</CardTitle>
              <CardDescription>
                This is a sample card to showcase the theme colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                Your content looks great in both light and dark modes with the new pink accent color.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Two</CardTitle>
              <CardDescription>
                Another example of how the theme works
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                The pink/coral accent color (#fe696e) provides a modern, vibrant look.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Three</CardTitle>
              <CardDescription>
                Perfect readability in any lighting condition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                Switch between themes using the toggle in the top-right corner.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
