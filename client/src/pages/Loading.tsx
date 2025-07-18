export const Loading = () => {
  return (
    <div className="w-screen h-screen flex  justify-center items-center bg-bg-image bg-right-top bg-no-repeat font-firago">
      <div className="flex flex-col justify-center items-center gap-10">
        <img
          src="./images/loading.svg"
          alt="loading"
          className="animate-spin w-[15rem]"
        />
        <div className="text-4xl text-[#25314C] text-[5rem] font-bold leading-[3.053rem] mt-[50px] ">
          იტვირთება...
        </div>
      </div>
    </div>
  );
};
