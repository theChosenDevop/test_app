import express, { Request, Response} from 'express';
import cors from 'cors';
import agentCard from './agent.json';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export interface JSONRPCError {
  code: number;
  message: string;
  data?: any;
}

app.get('/.well-known/agent.json', (req: Request, res: Response) => {
  res.send(agentCard);
});


app.post('/', (req: Request, res: Response) => {
  const { id, jsonrpc, params, method } = req.body;

  if (!id || !jsonrpc || !params || !method) {
    res.status(400).json({
      jsonrpc: '2.0',
      id: id || null,
      error: {
        code: -32600,
        message: 'Invalid request format'
      }});
     return;
  }
  
const response = {
  jsonrpc: '2.0',
  id: id,
  result: {
    messageId: '01970dba-d671-770a-a5ae-6eee73e18699',
    kind: "message",
    role: 'agent',
    parts: [
      {
        kind: 'text',
        text: ' I am an agent and I can help you with various tasks.'
      }
    ],
  }
}
  res.status(200).json(response);
  console.log('Received task:', response);
  return;
})


app.listen(port, () => {
  console.log(`Agent is running at http://localhost:${port}`);
});
