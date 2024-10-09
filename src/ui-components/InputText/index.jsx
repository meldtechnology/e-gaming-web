import { SearchResult } from "../SearchResult";


export const InputText = ({ size, value, placeHolderText, icon, onChange, loading, users }) => {
  return (
    <div className={size}>
      <div className="relative">
        <input type="text"
               size={size}
               value={value}
               className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
               placeholder={placeHolderText}
               onChange={onChange} />
        {icon}
      </div>
      <SearchResult value={value} users={users} loading={loading} />
    </div>
  );
}