export const InputCurrency = ({name, value, label, placeHolderText, required ,onChange}) => {
  return (
    <div className="w-full min-w-[200px] my-2">
      <div className="relative">
        <input type="number"
               name={name}
               value={value}
               className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
               placeholder={label}
               required={required}
               onChange={onChange} />

        <div className="absolute top-2 right-0 flex items-center pr-3">
          <div className="h-6 border-l border-slate-200 mr-2"></div>
          <button id="dropdownButton"
                  className="h-full text-sm flex justify-center items-center bg-transparent text-slate-700 focus:outline-none">
            <span id="dropdownSpan">USD</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="h-4 w-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div id="dropdownMenu"
               className="min-w-[150px] overflow-hidden absolute left-0 w-full mt-10 hidden bg-white border border-slate-200 rounded-md shadow-lg z-10">
            <ul id="dropdownOptions">
              <li className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer" data-value="USD">USD
              </li>
              <li className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer" data-value="EUR">EUR
              </li>
              <li className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer" data-value="CAD">CAD
              </li>
              <li className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer" data-value="RON">RON
              </li>
            </ul>
          </div>
        </div>

        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? "" : "hidden"} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5">
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {placeHolderText}
        </p>
      </div>
    </div>

    // <script>
    //   document.getElementById('dropdownButton').addEventListener('click', function() {
  //   var dropdownMenu = document.getElementById('dropdownMenu');
  //   if (dropdownMenu.classList.contains('hidden')) {
  //   dropdownMenu.classList.remove('hidden');
  // } else {
  //   dropdownMenu.classList.add('hidden');
  // }
  // });
  //
  //   document.getElementById('dropdownOptions').addEventListener('click', function(event) {
  //   if (event.target.tagName === 'LI') {
  //   const dataValue = event.target.getAttribute('data-value');
  //   document.getElementById('dropdownSpan').textContent = dataValue;
  //   document.getElementById('dropdownMenu').classList.add('hidden');
  // }
  // });
  //
  //   document.addEventListener('click', function(event) {
  //   var isClickInside = document.getElementById('dropdownButton').contains(event.target) || document.getElementById('dropdownMenu').contains(event.target);
  //   var dropdownMenu = document.getElementById('dropdownMenu');
  //
  //   if (!isClickInside) {
  //   dropdownMenu.classList.add('hidden');
  // }
  // });
  // </script>

)
  ;
}