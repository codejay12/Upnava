# pylint: disable = http-used,print-used,no-self-use

import datetime
import operator
import os
from typing import Annotated, TypedDict

from dotenv import load_dotenv
from langchain_core.messages import AnyMessage, HumanMessage, SystemMessage, ToolMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph
from langchain.chat_models import init_chat_model


_ = load_dotenv()

os.environ["GOOGLE_API_KEY"] = "AIzaSyBOcm3skWqRSBdHSkQ230o47KQRVoZf3hQ"
llm = init_chat_model("google_genai:gemini-2.0-flash")

class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]

def flights_finder(start,end):
  return "chicago flight"

def hotels_finder():
  return "radisson hotel"

TOOLS_SYSTEM_PROMPT = f"""You are a smart travel agency. Use the tools to look up information.
    You are allowed to make multiple calls (either together or in sequence).
    """
TOOLS = [flights_finder, hotels_finder]

EMAILS_SYSTEM_PROMPT = """write a email to the user"""


class Agent:

    def __init__(self):
        self._tools = {t.__name__: t for t in TOOLS}
        self._tools_llm = init_chat_model("google_genai:gemini-2.0-flash").bind_tools(TOOLS)

        builder = StateGraph(AgentState)
        builder.add_node('call_tools_llm', self.call_tools_llm)
        builder.add_node('invoke_tools', self.invoke_tools)
        builder.add_node('email_sender', self.email_sender)
        builder.set_entry_point('call_tools_llm')

        builder.add_conditional_edges('call_tools_llm', Agent.exists_action, {'more_tools': 'invoke_tools', 'email_sender': 'email_sender'})
        builder.add_edge('invoke_tools', 'call_tools_llm')
        builder.add_edge('email_sender', END)
        memory = MemorySaver()
        self.graph = builder.compile(checkpointer=memory, interrupt_before=['email_sender'])

        print(self.graph.get_graph().draw_mermaid())
        

    @staticmethod
    def exists_action(state: AgentState):
        result = state['messages'][-1]
        if len(result.tool_calls) == 0:
            return 'email_sender'
        return 'more_tools'

    def email_sender(self, state: AgentState):
        print('Sending email')
        email_llm =  init_chat_model("google_genai:gemini-2.0-flash")
        email_message = [SystemMessage(content=EMAILS_SYSTEM_PROMPT), HumanMessage(content=state['messages'][-1].content)]
        email_response = email_llm.invoke(email_message)
        print('Email content:', email_response.content)
        return email_response.content


    def call_tools_llm(self, state: AgentState):
        messages = state['messages']
        messages = [SystemMessage(content=TOOLS_SYSTEM_PROMPT)] + messages
        message = self._tools_llm.invoke(messages)
        return {'messages': [message]}

    def invoke_tools(self, state: AgentState):
        tool_calls = state['messages'][-1].tool_calls
        results = []
        for t in tool_calls:
            print(f'Calling: {t}')
            if not t['name'] in self._tools:  # check for bad tool name from LLM
                print('\n ....bad tool name....')
                result = 'bad tool name, retry'  # instruct LLM to retry if bad
            else:
                result = self._tools[t['name']]()
            results.append(ToolMessage(tool_call_id=t['id'], name=t['name'], content=str(result)))
        print('Back to the model!')
        return {'messages': results}
      
if __name__=='__main__':
  user_input = input("enter your query:")
  agent = Agent()
  thread_id=123
  messages = [HumanMessage(content=user_input)]
  config = {'configurable': {'thread_id': thread_id}}

  result = agent.graph.invoke({'messages': messages}, config=config)
  print(result['messages'][-1].content)
  