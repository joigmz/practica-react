import json
import boto3
import re
import uuid

def bedrock_call(userPrompt, agent_alias_id, agent_id, session_id):
    print(userPrompt)
    bedrock = boto3.client(service_name='bedrock-agent-runtime')

    session_id = session_id or uuid.uuid4().hex
    try:
        # Invoking the bedrock agent
        response = bedrock.invoke_agent(
            agentAliasId=agent_alias_id,
            agentId=agent_id,
            enableTrace=True,
            endSession=False,
            inputText=userPrompt,
            sessionId=session_id
        )
        print("Response of agent request:", response)
        event_stream = response['completion']
        session_id = response['sessionId']
        final_answer = None

        # Parse the event stream to get the final answer
        try:
            for event in event_stream:
                if 'chunk' in event:
                    data = event['chunk']['bytes']
                    print(f"data==>{data}")
                    try:
                        final_answer = data.decode('utf8')
                    except:
                        final_answer = data.decode()
                    final_answer = final_answer.replace('\n','\\n')
                    final_answer = final_answer.replace('\t','\\t')

                    if final_answer and final_answer.strip():
                        # Print the result verbatim
                        print("Final Answer",final_answer)
                        response = final_answer
                    else:
                        response = "The result does not contain any information."
                        print("Error: The result does not contain any information.")

                elif 'trace' in event:
                    print(event['trace'])
                    json.dumps(event['trace'], indent=2)
                else:
                    raise Exception("unexpected event.", event)
        except Exception as e:
            print(e)
            raise Exception("unexpected event.", e)
        return response, session_id
    except Exception as e:
        print("unexpected event.", e)
        return "Internal Server Error.", session_id

def lambda_handler(event, context):
    try:
        body = event.get('body', '{}')
        body_json = json.loads(body)
        userPrompt =  body_json.get('input_text', None)
        agent_alias_id =  body_json.get('agent_alias_id', None)
        agent_id =  body_json.get('agent_id', None)
        session_id =  body_json.get('session_id', None)

        response, session_id = bedrock_call(userPrompt, agent_alias_id, agent_id, session_id)

        return {
            'statusCode': 200,
            'body': {
                'r':json.dumps(response),
                'session_id':session_id,
                'r2':[userPrompt, agent_alias_id, agent_id, session_id]
            }
        }

    except:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid JSON'})
        }