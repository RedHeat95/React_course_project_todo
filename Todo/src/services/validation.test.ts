import { validationService } from "./validation";

describe("Validation", () => {
  test("ввод email RedHeatWork@gmail.com, функция возвращает пустую строку", () => {
    expect(validationService.validateEmail("RedHeatWork@gmail.com")).toBe("");
  });

  test("ввод password Go123456, функция возвращает пустую строку", () => {
    expect(validationService.validatePassword("Go123456")).toBe("");
  });
  test("ввод password, функция возвращает ошибку", () => {
    expect(validationService.validatePassword("")).toBe("Введите пароль");
  });
  test("ввод password, функция возвращает ошибку", () => {
    expect(validationService.validatePassword("Go12345")).toBe(
      "Пароль должен содержать не менее 8 символов и не более 30 символов"
    );
  });
  test("ввод password, функция возвращает ошибку", () => {
    expect(
      validationService.validatePassword("Go123456Go123456Go123456Go123456")
    ).toBe(
      "Пароль должен содержать не менее 8 символов и не более 30 символов"
    );
  });
  test("ввод password, функция возвращает ошибку", () => {
    expect(validationService.validatePassword("Gooooooo")).toBe(
      "Пароль должен содержать не менее 1 цифры, 1 прописной и 1 строчной буквы"
    );
  });
  test("ввод password, функция возвращает ошибку", () => {
    expect(validationService.validatePassword("go123456")).toBe(
      "Пароль должен содержать не менее 1 цифры, 1 прописной и 1 строчной буквы"
    );
  });
  test("ввод password, функция возвращает ошибку", () => {
    expect(validationService.validatePassword("GO123456")).toBe(
      "Пароль должен содержать не менее 1 цифры, 1 прописной и 1 строчной буквы"
    );
  });
});
