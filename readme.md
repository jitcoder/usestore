# useStore

useStore is a library that allows you to maintain the state of your application globally while being able to use certain parts of the state with hooks.

Parts of the state can be targeted with a path.
eg. `todo.items`

Whenever that key is changed, the appropriate hooks will be called.

In the below example, if `store.set('todo.items')` is called, it will cause any component that used the useStore hook on key `todo.items` to be re-rendered.

## Example Usage

`api.js`
```javascript
import store from '@jitcoder/usestore';

export const getItems = async () => {
  const results = await axios.get('http://localhost:3001/todo');
  store.set('todo.items', results.data || []);
  return results.data;
}
```

`MyComponent.jsx`
```jsx
const ItemView = () => {
  const [items] = useStore('todo.items', []);
  return (
    <List>
      {
        items.map((i) => {
          return (
            <ListItem>
              <ListItemText primary={i.title} />
              <ListItemIcon>
                <Button onClick={() => deleteItem(i.id)}>
                  <DeleteIcon />
                </Button>
              </ListItemIcon>
            </ListItem>
          )
        })
      }
    </List>
  );
}
```


