from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
 


# Helper function to call OpenAI API
def ask_ai(prompt):

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(url, headers=headers, json=data)

    print("STATUS CODE:", response.status_code)
    print("RESPONSE:", response.text)

    if response.status_code != 200:
        return None

    result = response.json()

    return result["choices"][0]["message"]["content"]


# API 1 → Generate Interview Question
@api_view(['GET'])
def generate_question(request):

    field = request.GET.get("field")

    if not field:
        return Response({
            "error": "Field parameter is required. Example: ?field=python"
        })

    prompt = f"""
    You are a technical interviewer.

    Ask ONE interview question about {field}.
    Only return the question.
    """

    question = ask_ai(prompt)

    if not question:
        return Response({
            "error": "AI service failed"
        })

    return Response({
        "question": question
    })


# API 2 → Check Answer + Ask Next Question
@api_view(['POST'])
def check_answer(request):

    question = request.data.get("question")
    answer = request.data.get("answer")
    field = request.data.get("field")

    if not question or not answer or not field:
        return Response({
            "error": "question, answer, and field are required"
        })

    prompt = f"""
    You are a technical interviewer.

    Question: {question}

    Candidate Answer: {answer}

    Evaluate shortly:

    1. Tell if the answer is Correct or Incorrect
    2. Explain the mistake
    3. Provide the correct short answer
    4. Ask the NEXT interview question about {field}

    Format response like:

    Feedback:
    Next Question:
    """

    result = ask_ai(prompt)

    if not result:
        return Response({
            "error": "AI service failed"
        })

    return Response({
        "result": result
    })