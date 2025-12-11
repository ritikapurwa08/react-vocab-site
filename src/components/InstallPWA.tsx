import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/MaterialIconHelper";
import { toast } from "sonner";

export function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isIOS] = useState(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

  useEffect(() => {
    // Check if on iOS
    // The isIOS state is initialized directly, no need to set here.

    // Handler for Chrome/Edge/Android
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      console.log("PWA Install Prompt Triggered");
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    // Listen for the event
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    promptInstall.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        toast.success("Installing app...");
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setPromptInstall(null);
      setSupportsPWA(false); // Hide button after action
    });
  };

  // If already installed (standalone mode), hide button
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return null;
  }

  // iOS Instructions (Button triggers toast instructions)
  if (isIOS) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="hidden md:flex gap-2 border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => toast.info("To install on iOS: Tap 'Share' button -> 'Add to Home Screen'")}
      >
        <Icon name="ios_share" className="text-lg" />
        Install App
      </Button>
    );
  }

  // Default: Hide if not supported or event hasn't fired yet
  if (!supportsPWA) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex gap-2 border-primary/20 text-primary hover:bg-primary/10 animate-in fade-in zoom-in duration-300"
      onClick={onClick}
    >
      <Icon name="download" className="text-lg" />
      Install App
    </Button>
  );
}
