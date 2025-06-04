import express, { Request, Response} from 'express';
import cors from 'cors';
import agentCard from './agent.json';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/.well-known/agent.json', (req: Request, res: Response) => {
  res.send(agentCard);
});


app.post('/task', (req: Request, res: Response) => {
  const { id, jsonrpc, result, method } = req.body;
  if (!id || !jsonrpc || !result || !method) {
     res.status(400).json({ error: 'Invalid request format' });
     return;
  }
  const {parts} = result;
  const text  = parts[0].text;
  const response = {
    jsonrpc: '2.0',
    id: id,
    result: {
      taskId: result.taskId || null,
      messageId: result.messageId,
      contextId: result.contextId,
      role: 'agent',
      kind: result.kind,
      "parts": [
        {
          type: 'text',
          text: `Received your message: ${text}`,
          metadata: null
        }
      ],
      "metadata": result.metadata || null
    },
    method: "message/send"
  }
  res.status(200).json(response);
  console.log('Received task:', response);
  return;
})


app.listen(port, () => {
  console.log(`Agent is running at http://localhost:${port}`);
});
