const prompt = {
  loading: "🔃 Loading...",
  notMobile: "📱 Please use mobile device",
};

type Props = {
  type: "loading" | "notMobile";
};

const PromptScreen = ({ type }: Props) => {
  return (
    <section className="flex h-screen flex-col justify-center gap-2  text-center ">
      <h1 className="text-5xl font-bold">{prompt[type]}</h1>
    </section>
  );
};

export default PromptScreen;
