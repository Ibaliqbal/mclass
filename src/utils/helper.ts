export function generateRandomCode(leng: number, existCode: string[]) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = [];

  while (code.length < leng) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code.push(characters.charAt(randomIndex));

    // Cek jika hasilnya sama dengan someCode
    if (existCode.includes(code.join(""))) {
      code = []; // Reset jika sama
    }
  }

  return code.join(""); // Kembalikan hasil sebagai string
}
