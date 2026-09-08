const Home = () => {
  return (
<main className="flex justify-center items-center bg-[#65435e] h-screen w-full">
    <div className="h-[70%] w-[20%] px-4 py-8 bg-amber-400 flex flex-col gap-4">
        <label htmlFor="jobDescription" className="text-2xl font-semibold">Job Description:</label>
        <textarea name="jobDescription" id="jobDescription" placeholder='enter job description.....'
        className="bg-[#807272]  rounded-2xl min-h-[95%] text-white p-2 text-lg"
        ></textarea>
    </div>
    <div className="h-[70%] w-[20%] px-4 py-8 bg-amber-900 flex flex-col gap-2">
         <div className="text-xl font-semibold">
            <p className="text-2xl font-semibold">Resume <small className="text-[16px] text-[#9d0000]">(use resume and self description together for best result)</small></p>
            <label className="bg-[#807272] cursor-pointer w-full block text-center mt-2  rounded-2xl text-white p-2 text-lg" htmlFor="resume">Upload Resume</label>
            <input type="file" id="resume" name="resume"  accept=".pdf,.doc,.docx"
            className=" hidden w-full"
            />
         </div>
         <div className="bg-[#c3ff38] h-full rounded-2xl p-2 flex flex-col gap-2">
            <label className="text-xl font-semibold" htmlFor="selfDescription">Self Description:</label>
            <textarea className="bg-[#807272]  rounded-2xl min-h-[90%] text-white p-2 text-lg "name="selfDescription" id="selfDescription" placeholder='enter self description.....'></textarea>
         </div>
         <button type="submit">Gererate interview Report</button>
    </div>
</main>
)
}

export default Home