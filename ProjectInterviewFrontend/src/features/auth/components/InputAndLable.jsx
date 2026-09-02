const InputAndLable = ({label,type,placeholder,name,setFormData,formData}) => {
    const handleChange = (e)=>{
        const {name,value} = e.target
        if(setFormData){
            setFormData((prev)=>(
                {
                ...prev,
                [name]:value
                }
            ))
        }

    }
  return (
    <div className="flex flex-col gap-1 mt-6">
      <label className="text-white text-lg font-semibold" htmlFor={`${name}`}>
       {label}
      </label>
      <input
      onChange={handleChange}
      value={formData[name]}
      required
        className=" bg-white h-12 rounded-3xl outline-none text-xl font-semibold px-4 py-2 w-full"
        placeholder={`${placeholder}`}
        type={`${type}`}
        name={`${name}`}
        id={`${name}`}
      />
    </div>
  );
};

export default InputAndLable;
