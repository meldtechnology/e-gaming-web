export const passwordGenerator = (length) => {
  let newPassword = '';
  let passwordPool = '';
  const characterSet = {
    useSymbols: "!@#$%^&*()",
    useNumbers: "0123456789",
    useLowerCase: "abcdefghijklmnopqrstuvwxyz",
    useUpperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }

  passwordPool = characterSet.useSymbols.concat
  (characterSet.useNumbers,
    characterSet.useLowerCase,
    characterSet.useUpperCase)

  for(let index = 0; index < length; index++) {
      newPassword +=
        passwordPool.charAt(Math.floor(Math.random() * passwordPool.length))
  }

  return newPassword;
}