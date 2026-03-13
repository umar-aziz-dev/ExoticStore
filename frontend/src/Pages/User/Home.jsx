import banner from "../../assets/banner.jpg";

export const UserHome = () => {
  return (
    <div className="w-full md:h-[520px] flex justify-center">
      <img
        src={banner}
        alt="banner"
        className="w-full h-auto rounded-xl"
      />
    </div>
  );
};