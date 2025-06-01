import axios from "axios";
import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    questions: [],
  }),
  actions: {
    addQuestion(label, type, placeholder = "") {
      if (!type) return;
      const answer = type === "checkbox" ? [] : "";
      this.questions.push({
        label,
        type,
        placeholder,
        options: [],
        answer: answer,
      });
    },
    updateData(idx, data) {
      if (!this.questions[idx]) return;
      console.log("Обновляю вопрос", idx, data);
      this.questions[idx].label = data.label;
      this.questions[idx].placeholder = data.placeholder;
    },
    submitToFirebase(url, name) {
      axios
        .put(url, {
          formName: name,
          questions: this.questions,
          createdAt: new Date().toISOString(),
        })
        .then((res) => console.log("Успешно отправлено", res))
        .catch((err) => console.log("Ошибка отппаке", err))
        .finally(console.log(this.questions));
    },
  },
});
