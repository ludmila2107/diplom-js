//const { response } = require("express");

/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error("элемента не существует");
    }
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    // console.log(response)
    // event.preventDefault();
    // if (response.success === true){
    //    this.submit();
    // }
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    // const form = document.querySelector('#myform');
    //  let keys = form.querySelectorAll.getAttribute(name);
    //  let values = form.querySelectorAll.getAttribute(value);
    //  let object = {};
    //  for (let i=0;i<keys.length;i++){
    //    object.keys[i] = values[i];
    //  }
    //  return object;
    const formData = new FormData(this.element);
    const formDataConversion = {};

    for (const element of formData.entries()) {
      formDataConversion[element[0]] = element[1];
    }

    return formDataConversion;
  }

  onSubmit(options) {}

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData());
  }
}
