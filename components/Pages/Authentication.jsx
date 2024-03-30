import { InternetIdentityProvider, signIn } from "@junobuild/core-peer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/app/page";

function Authentication() {

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const { toast } = useToast();

  const handleSubmit = async () => {
   try{
      setIsLoading(true);

      const user = await home(user);
      setUser(user);

   }catch(error){
    console.log(error);
    const errorMessage = error.message;
    toast({
      title: errorMessage,
      description: error.Message
    });
   }finally{
    setIsLoading(false);
   }
  }


  

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
        <Button className="w-full" disabled={isLoading} onClick={async () => await signIn({ 
           provider:  new InternetIdentityProvider({
          domain: "ic0.app",
        })
      })}>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {!isLoading && (
            <span className="ml-2">
              {t("authentication.form.continue_button")}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Authentication;
