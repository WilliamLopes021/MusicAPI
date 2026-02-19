const verificationService = {
  compareCode(code, inputCode) {
    for (const value of [code, inputCode]) {
      if (!value || value.trim() === "") {
        throw new AppError(`Código inválido`, 400);
      }
    }

    if (code === inputCode) return { success: true };

    return { success: false };
  },

};

export default verificationService;
