const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center font-firago bg-bg-image bg-right-top bg-no-repeat">
      <div className="flex flex-col justify-center items-center gap-10">
        <img src="./images/notFound.svg" alt="logo" className="w-[16rem]" />
        <div className="text-4xl text-[#25314C] text-[5rem] font-bold leading-[3.053rem] mt-[50px] ">
          გვერდი არ მოიძებნა!
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
