const OnboardingThree = ({ ...props }) => {
  return (
    <div
      className="flex h-screen flex-col justify-center gap-2  text-center "
      {...props}
    >
      <h1 className="text-5xl font-bold">Know the Box Content</h1>
      <h1 className="text-3xl font-semibold">Without 😎 Opening it</h1>
    </div>
  );
};

export default OnboardingThree;
