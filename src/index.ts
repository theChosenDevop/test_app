import express, { Request, Response} from 'express';
import cors from 'cors';
import agentCard from './agent.json';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

app.get('/.well-known/agent.json', (req: Request, res: Response) => {
  res.send(agentCard);
});


app.post('/task', (req: Request, res: Response) => {
  res.status(200).json(req.body)
 console.log('Received task:', req.body);
})

app.listen(port, () => {
  console.log(`Agent is running at http://localhost:${port}`);
});
