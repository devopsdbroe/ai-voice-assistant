from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from project_config import setup_app_config

setup_app_config()

llm = ChatOpenAI(temperature=1)

# Allows the AI to remember previous questions
chat_memory = ConversationBufferMemory()

def handle_get_response_for_user(user_prompt:str)->str:
    conversation = ConversationChain(
        llm=llm,
        verbose=False,
        memory=chat_memory
    )

    result = conversation.predict(input=user_prompt)
    print("result >> ", result)
    return result

def run():
    while True:
        user_prompt = input("Ask the bot something, or press 0 to leave: ")
        if user_prompt == "0":
            break
        handle_get_response_for_user(user_prompt)


if __name__ == "__main__":
    run()