const Header = () => {
  return (
    <div
      className="w-full pt-[1.5rem] pl-[3rem] flex justify-start items-center gap-[2.8rem] font-bold text-[3.6rem] 
    font-firago uppercase text-primary "
    >
      <div className="w-[14rem] h-[14rem] rounded-full bg-[#EDF6FE] flex justify-center items-center">
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <p>EASY PARK</p>
    </div>
  );
};

export default Header;
