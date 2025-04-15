import { useTalkStore } from "../store/useTalksStore";

function Form() {
    

  return (
    <section className="bg-[#e7dfd8] p-6 rounded-2xl shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-[#4b3f33]">Create a Talk</h2>
    <form className="space-y-4">
      <input type="text" placeholder="Title" className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]" />
      <input type="text" placeholder="Topic" className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]" />
      <input type="number" placeholder="Duration (min)" className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]" />
      <textarea placeholder="Objective" className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]" rows="3"></textarea>
      <input type="text" placeholder="Presenters (comma-separated)" className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]" />
      <button type="submit" className="w-full bg-[#a68b6d] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#92755b] transition">Save Talk</button>
    </form>
  </section>
  );
}

export default Form;
