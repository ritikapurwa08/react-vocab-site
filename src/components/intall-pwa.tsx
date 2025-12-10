import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/material-icon-helper";
import { toast } from "sonner";

export function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };

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
    });
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden md:flex gap-2 border-primary/20 text-primary hover:bg-primary/10"
      onClick={onClick}
    >
      <Icon name="download" className="text-lg" />
      Install App
    </Button>
  );
}
