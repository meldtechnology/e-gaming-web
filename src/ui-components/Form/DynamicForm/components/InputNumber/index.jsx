export const InputNumber = ({name, value, label, placeHolderText, required ,onChange}) => {

  // Select the elements
  // const amountInput = document.getElementById('amountInput');
  // const increaseButton = document.getElementById('increaseButton');
  // const decreaseButton = document.getElementById('decreaseButton');
  //
  // // Increase the value
  // increaseButton.addEventListener('click', () => {
  //   amountInput.value = parseInt(amountInput.value) + 1;
  // });
  //
  // // Decrease the value and prevent going below 0
  // decreaseButton.addEventListener('click', () => {
  //   amountInput.value = Math.max(0, parseInt(amountInput.value) - 1);
  // });
  return (
    <div className="w-full min-w-[200px] my-2">
      <div className="relative">
        <button
          id="decreaseButton"
          className="absolute right-9 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#ffffff"
            className="w-4 h-4"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </button>
        <input type="number"
               name={name}
               value={value}
               className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
               placeholder={label}
               required={required}
               onChange={onChange} />

        <button
          id="increaseButton"
          className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#ffffff"
            className="w-4 h-4"
          >
            <path
              d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
            />
          </svg>
        </button>

        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? '' : 'hidden'} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5">
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {placeHolderText}
        </p>
      </div>
    </div>
  );
}