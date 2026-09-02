const InputAndLable = ({label,type,placeholder,name}) => {
  return (
    <div className="flex flex-col gap-1 mt-6">
      <label className="text-white text-lg font-semibold" htmlFor="email">
       {label}
      </label>
      <input
        className=" bg-white h-12 rounded-3xl outline-none text-xl font-semibold px-4 py-2 w-full"
        placeholder={`${placeholder}`}
        type={`${type}`}
        name={`${name}`}
        id={`${type}`}
      />
    </div>
  );
};

export default InputAndLable;
