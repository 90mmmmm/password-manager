import { InternetIdentityProvider, signIn } from "@junobuild/core-peer";

import { Button } from "@/components/ui/button";

import { Lock } from "lucide-react";

import { useTranslation } from "react-i18next";

function Authentication() {

  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-10 h-10" />
        </div>
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight mb-2 text-center">
            {t("authentication.form.heading")}
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            {t("authentication.form.subheading")}
          </p>
        </div>
  
        <Button className="w-full"  onClick={async () => await signIn({ 
          provider:  new InternetIdentityProvider({
            domain: "ic0.app",
          })
        })}
        >
            <span className="ml-2">
              {t("authentication.form.continue_button")}
            </span>
        </Button>
      </div>
    </div>
  );
}

export default Authentication;
