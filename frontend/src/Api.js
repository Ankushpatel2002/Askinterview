const BASE_URL = "http://127.0.0.1:8000/api";

export async function generateQuestion(field) {
  const res = await fetch(`${BASE_URL}/generate-question/?field=${field}`);
  return res.json();
}

export async function checkAnswer(data) {
  const res = await fetch(`${BASE_URL}/check-answer/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}