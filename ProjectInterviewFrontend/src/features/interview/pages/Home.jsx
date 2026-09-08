const Home = () => {
  return (
<main className="flex justify-center items-center bg-[#65435e] h-screen w-full">
    <div>
        <textarea name="jobDescription" placeholder='enter job description.....'></textarea>
    </div>
    <div>
         <div>
            <label htmlFor="resume">Resume:</label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" />
         </div>
         <div>
            <label htmlFor="selfDescription">Self Description:</label>
            <textarea name="selfDescription" placeholder='enter self description.....'></textarea>
         </div>
         <button type="submit">Gererate interview Report</button>
    </div>
</main>
)
}

export default Home