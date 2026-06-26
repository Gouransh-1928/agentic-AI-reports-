import os
from dotenv import load_dotenv

from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI

from tools import flight_status
from prompts import SYSTEM_PROMPT

# Load environment variables
load_dotenv()

# Create Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0,
)

# Create LangChain Agent
agent = create_agent(
    model=llm,
    tools=[flight_status],
    system_prompt=SYSTEM_PROMPT,
)

print("✈ Flight Agent Started!")
print("Type 'exit' to quit.\n")

while True:
    question = input("You: ")

    if question.lower() == "exit":
        break

    response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": question,
                }
            ]
        }
    )

    print("\nAssistant:")

    final_message = response["messages"][-1]

    print(final_message.content)

    print()