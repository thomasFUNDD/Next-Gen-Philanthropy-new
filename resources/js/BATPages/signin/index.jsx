import LeftSide from "../../Components/BATComponents/signin";

function SignIn() {
  return (
    <section className="bg-lightPurple dark:bg-darkblack-500 h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full h-full">
        <LeftSide />
      </div>
    </section>
  );
}

export default SignIn;