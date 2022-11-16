import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import { useState } from "react";
import OnboardingOne from "./onboarding-one";
import OnboardingThree from "./onboarding-three";
import OnboardingTwo from "./onboarding-two";

const OnboardingScreen = () => {
  const [phase, setPhase] = useState(0);

  const handleSignIn = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("viewedOnboarding", "true");
      signIn();
    } else {
      alert("Error: window is undefined");
    }
  };

  return (
    <section>
      {phase === 0 && <OnboardingOne />}
      {phase === 1 && <OnboardingTwo />}
      {phase === 2 && <OnboardingThree />}
      <div className="absolute bottom-10 right-10">
        <button
          className="flex items-center rounded-full bg-blue-600 px-4 py-2 text-xl font-medium"
          onClick={() => (phase < 2 ? setPhase(phase + 1) : handleSignIn())}
        >
          {phase < 2 ? "Next" : "Login"}{" "}
          <ChevronRightIcon className="ml-2 h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default OnboardingScreen;
