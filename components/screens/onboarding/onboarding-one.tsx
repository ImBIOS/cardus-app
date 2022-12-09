const OnboardingOne = ({ ...props }) => {
  return (
    <div
      className="flex h-screen flex-col justify-center gap-2  text-center "
      {...props}
    >
      <h1 className="text-5xl font-bold">Easy Manage 😉</h1>
      <h1 className="text-3xl font-semibold">Personal Warehousing</h1>
    </div>
  );
};

export default OnboardingOne;
