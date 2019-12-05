```
import store from '@jitcoder/usestore';

export const getItems = async () => {
  const results = await axios.get('http://localhost:3001/todo');
  store.set('todo.items', results.data || []);
  return results.data;
}
```

```
const [items] = useStore('todo.items', []);
```
